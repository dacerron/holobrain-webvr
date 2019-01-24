package comm

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

type session struct {
	teacher	teacherConn
	students []studentConn
}

type Server struct {
	sessions map[string] session
}

type teacherConn struct {
	infoChannel chan string
	highlightChannel chan string
}

type studentConn struct {
	infoChannel chan string
	nameChannel chan string
}

//generating session means teacher has made first contact, on ack they will start sharing
func (s *Server) GenerateSession() string {
	if s.sessions == nil {
		s.sessions = make(map[string]session)
	}

	rand.Seed(int64(time.Now().Nanosecond()))
	sessionId := strconv.Itoa(rand.Intn(999999))
	teacherInfoChan := make(chan string)
	teacherHighlightChan := make(chan string)

	s.sessions[sessionId] = session {teacherConn{teacherInfoChan, teacherHighlightChan}, nil}

	go func() {
		for{
			s.monitorTeacherInfo(sessionId)
		}
	}()

	go func() {
		for {
			s.monitorTeacherHighlight(sessionId)
		}
	}()
	return sessionId
}

func (s *Server) ReceiveInfo(sessionId string, info string) {
	s.sessions[sessionId].teacher.infoChannel <- info //writes to channel so that info can be distributed to session
}

func (s *Server) ReceiveHighlight(sessionId string, highlight string) {
	s.sessions[sessionId].teacher.highlightChannel <- highlight
}

func (s *Server) monitorTeacherInfo(id string) {
	session, err := s.sessions[id]
	if err == false {
		fmt.Println("TEACHER: tried to access session that doesnt exist")
	}
	fmt.Println("starting info monitoring")
	next := <- session.teacher.infoChannel // should block here until the next message is received
	fmt.Println("TEACHER: shared info:", next)
}

func (s *Server) monitorTeacherHighlight(id string) {
	session, err := s.sessions[id]
	if err == false {
		fmt.Println("TEACHER: tried to access session that doesnt exist")
	}

	fmt.Println("starting highlight monitoring")
	next := <- session.teacher.highlightChannel // should block here until the next message is received
	fmt.Println("TEACHER: shared highlighting:", next)
}
