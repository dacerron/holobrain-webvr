package comm

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

type session struct {
	teacher           *teacherConn
	infoRequests      []*studentRequest
	highlightRequests []*studentRequest
}

type Server struct {
	sessions map[string]*session
}

type teacherConn struct {
	infoChannel      chan string
	highlightChannel chan string
}

type studentRequest struct {
	channel   chan string
	fulfilled bool
}

//generating session means teacher has made first contact, on ack they will start sharing
func (s *Server) GenerateSession() string {
	if s.sessions == nil {
		s.sessions = make(map[string]*session)
	}

	rand.Seed(int64(time.Now().Nanosecond()))
	sessionId := strconv.Itoa(rand.Intn(999999))
	teacherInfoChan := make(chan string)
	teacherHighlightChan := make(chan string)

	infoRequests := make([]*studentRequest, 0, 256)
	highlightRequests := make([]*studentRequest, 0, 256)

	s.sessions[sessionId] = &session{&teacherConn{teacherInfoChan, teacherHighlightChan}, infoRequests, highlightRequests}
	go s.monitorTeacherInfo(sessionId)
	go s.monitorTeacherHighlight(sessionId)
	return sessionId
}

func (s *Server) ReceiveInfo(sessionId string, info string) {
	s.sessions[sessionId].teacher.infoChannel <- info //writes to channel so that info can be distributed to session
}

func (s *Server) ReceiveHighlight(sessionId string, highlight string) {
	s.sessions[sessionId].teacher.highlightChannel <- highlight
}

func (s *Server) RegisterStudentInfoRequest(id string) string {
	session, err := s.sessions[id]
	if err == false {
		fmt.Println("student tried to request info from session that doesnt exist:", id)
	}

	curChannel := make(chan string)
	curRequest := studentRequest{curChannel, false}
	session.infoRequests = append(session.infoRequests, &curRequest)
	result := <-curRequest.channel
	fmt.Println("data came through from teacher to student info request channel")
	return result
}

func (s *Server) RegisterStudentHighlightRequest(id string) string {
	session, err := s.sessions[id]
	if err == false {
		fmt.Println("student tried to request highlight from session that doesnt exist:", id)
	}

	curChannel := make(chan string)
	curRequest := studentRequest{curChannel, false}
	session.highlightRequests = append(session.highlightRequests, &curRequest)
	result := <-curRequest.channel
	fmt.Println("data came through from teacher to student highlight request channel")
	return result
}

func (s *Server) monitorTeacherInfo(id string) {
	for msg := range s.sessions[id].teacher.infoChannel {
		fmt.Println("received data on info channel, students waiting for data: ", len(s.sessions[id].infoRequests))
		for i := 0; i < len(s.sessions[id].infoRequests); i++ {
			curList := s.sessions[id].infoRequests
			if curList[i].fulfilled == false {
				curList[i].channel <- msg
				curList[i].fulfilled = true
			}
			s.sessions[id].infoRequests = make([]*studentRequest, 0, 256)
		}
	}
}

func (s *Server) monitorTeacherHighlight(id string) {
	for msg := range s.sessions[id].teacher.highlightChannel {
		fmt.Println("received data on highlight channel, students waiting for data: ", len(s.sessions[id].highlightRequests))
		for i := 0; i < len(s.sessions[id].highlightRequests); i++ {
			curList := s.sessions[id].highlightRequests
			if curList[i].fulfilled == false {
				curList[i].channel <- msg
				curList[i].fulfilled = true
			}
			s.sessions[id].highlightRequests = make([]*studentRequest, 0, 256)
		}
	}
}