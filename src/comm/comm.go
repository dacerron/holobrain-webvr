package comm

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

type session struct {
	teacher                *teacherConn
	infoRequestBuffer      []*studentRequest
	infoIndex              int
	highlightRequestBuffer []*studentRequest
	highlightIndex         int
}

//Server is a container for all the connections to students and teachers
type Server struct {
	sessions map[string]*session
}

type teacherConn struct {
	infoChannel      chan []byte
	highlightChannel chan []byte
}

type studentRequest struct {
	channel chan []byte
}

//GenerateSession means teacher has made first contact, on ack they will start sharing
func (s *Server) GenerateSession() string {
	if s.sessions == nil {
		s.sessions = make(map[string]*session)
	}

	rand.Seed(int64(time.Now().Nanosecond()))
	sessionID := strconv.Itoa(rand.Intn(999999))
	teacherInfoChan := make(chan []byte)
	teacherHighlightChan := make(chan []byte)

	infoRequests := make([]*studentRequest, 4096, 4096)
	highlightRequests := make([]*studentRequest, 4096, 4096)

	for i := 0; i < 4096; i++ {
		infoRequests[i] = &studentRequest{make(chan []byte)}
		highlightRequests[i] = &studentRequest{make(chan []byte)}
	}

	s.sessions[sessionID] = &session{&teacherConn{teacherInfoChan, teacherHighlightChan}, infoRequests, 0, highlightRequests, 0}
	go s.multiplexInfoChannel(sessionID)
	go s.multiplexHighlightChannel(sessionID)
	return sessionID
}

//ReceiveInfo put the teacher's shared info into the buffer to be distributed by the multiplex method
func (s *Server) ReceiveInfo(sessionID string, info []byte) {
	_, err := s.sessions[sessionID]
	if err == false {
		fmt.Println("teacher tried to share to a session that doesnt exist")
		return
	}
	s.sessions[sessionID].teacher.infoChannel <- info //writes to channel so that info can be distributed to session
}

//ReceiveHighlight put the teacher's shared highlight into the buffer to be distributed by the multiplex method
func (s *Server) ReceiveHighlight(sessionID string, highlight []byte) {
	_, err := s.sessions[sessionID]
	if err == false {
		fmt.Println("teacher tried to share to a session that doesnt exist")
		return
	}
	s.sessions[sessionID].teacher.highlightChannel <- highlight
}

// RegisterStudentInfoRequest put student's request on the waiting list to be distributed on next teacher share
func (s *Server) RegisterStudentInfoRequest(id string) []byte {
	session, err := s.sessions[id]
	if err == false {
		fmt.Println("student tried to request info from session that doesnt exist:", id)
		return make([]byte, 0)
	}

	index := session.infoIndex
	session.infoIndex++
	return <-session.infoRequestBuffer[index].channel
}

// RegisterStudentHighlightRequest put student's request on the waiting list to be distributed on next teacher share
func (s *Server) RegisterStudentHighlightRequest(id string) []byte {
	session, err := s.sessions[id]
	if err == false {
		fmt.Println("student tried to request highlight from session that doesnt exist:", id)
		return make([]byte, 0)
	}

	index := session.highlightIndex
	session.highlightIndex++
	return <-session.highlightRequestBuffer[index].channel
}

func (s *Server) multiplexInfoChannel(id string) {
	for msg := range s.sessions[id].teacher.infoChannel {
		//newList := make([]*studentRequest, 0, 256)
		//fmt.Println("received data on info channel, students waiting for data: ", len(s.sessions[id].infoRequests))
		for i := 0; i < len(s.sessions[id].infoRequestBuffer); i++ {
			go func(dist []byte, index int) {
				select {
				case <-s.sessions[id].infoRequestBuffer[index].channel:
					s.sessions[id].infoRequestBuffer[index].channel <- dist
					break
				default:
					s.sessions[id].infoRequestBuffer[index].channel <- dist
				}
			}(msg, i)
		}
		s.sessions[id].infoIndex = 0
	}
}

func (s *Server) multiplexHighlightChannel(id string) {
	for msg := range s.sessions[id].teacher.highlightChannel {
		//newList := make([]*studentRequest, 0, 256)
		//fmt.Println("received data on highlight channel, students waiting for data: ", len(s.sessions[id].highlightRequests))
		for i := 0; i < len(s.sessions[id].highlightRequestBuffer); i++ {
			go func(dist []byte, index int) {
				select {
				case <-s.sessions[id].highlightRequestBuffer[index].channel:
					s.sessions[id].highlightRequestBuffer[index].channel <- dist
					break
				default:
					s.sessions[id].highlightRequestBuffer[index].channel <- dist
					break
				}
			}(msg, i)
		}
		s.sessions[id].highlightIndex = 0
	}
}
