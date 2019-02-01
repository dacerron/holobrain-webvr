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
	infoChannel      chan []byte
	highlightChannel chan []byte
}

type studentRequest struct {
	channel   chan []byte
	fulfilled bool
}

//generating session means teacher has made first contact, on ack they will start sharing
func (s *Server) GenerateSession() string {
	if s.sessions == nil {
		s.sessions = make(map[string]*session)
	}

	rand.Seed(int64(time.Now().Nanosecond()))
	sessionId := strconv.Itoa(rand.Intn(999999))
	teacherInfoChan := make(chan []byte)
	teacherHighlightChan := make(chan []byte)

	infoRequests := make([]*studentRequest, 0, 4096)
	highlightRequests := make([]*studentRequest, 0, 4096)

	s.sessions[sessionId] = &session{&teacherConn{teacherInfoChan, teacherHighlightChan}, infoRequests, highlightRequests}
	go s.monitorTeacherInfo(sessionId)
	go s.monitorTeacherHighlight(sessionId)
	return sessionId
}

func (s *Server) ReceiveInfo(sessionId string, info []byte) {
	s.sessions[sessionId].teacher.infoChannel <- info //writes to channel so that info can be distributed to session
}

func (s *Server) ReceiveHighlight(sessionId string, highlight []byte) {
	s.sessions[sessionId].teacher.highlightChannel <- highlight
}

func (s *Server) RegisterStudentInfoRequest(id string) []byte {
	session, err := s.sessions[id]
	if err == false {
		fmt.Println("student tried to request info from session that doesnt exist:", id)
	}

	curChannel := make(chan []byte)
	curRequest := studentRequest{curChannel, false}
	session.infoRequests = append(session.infoRequests, &curRequest)
	result := <-curRequest.channel
	return result
}

func (s *Server) RegisterStudentHighlightRequest(id string) []byte {
	session, err := s.sessions[id]
	if err == false {
		fmt.Println("student tried to request highlight from session that doesnt exist:", id)
	}

	curChannel := make(chan []byte)
	curRequest := studentRequest{curChannel, false}
	session.highlightRequests = append(session.highlightRequests, &curRequest)
	result := <-curRequest.channel
	return result
}

func (s *Server) monitorTeacherInfo(id string) {
	for msg := range s.sessions[id].teacher.infoChannel {
		//newList := make([]*studentRequest, 0, 256)
		//fmt.Println("received data on info channel, students waiting for data: ", len(s.sessions[id].infoRequests))
		for i := 0; i < len(s.sessions[id].infoRequests); i++ {
			go func(dist []byte, index int) {
				if !s.sessions[id].infoRequests[index].fulfilled {
					s.sessions[id].infoRequests[index].channel <- dist
					s.sessions[id].infoRequests[index].fulfilled = true
					//newList = append(newList, s.sessions[id].infoRequests[i])
				}
			}(msg, i)
		}
	}
}

func (s *Server) monitorTeacherHighlight(id string) {
	for msg := range s.sessions[id].teacher.highlightChannel {
		//newList := make([]*studentRequest, 0, 256)
		//fmt.Println("received data on highlight channel, students waiting for data: ", len(s.sessions[id].highlightRequests))
		for i := 0; i < len(s.sessions[id].highlightRequests); i++ {
			go func(dist []byte, index int) {
				if !s.sessions[id].highlightRequests[index].fulfilled {
					s.sessions[id].highlightRequests[index].channel <- dist
					s.sessions[id].highlightRequests[index].fulfilled = true
					//newList = append(newList, s.sessions[id].highlightRequests[i])
				}
			}(msg, i)
		}
	}
}
