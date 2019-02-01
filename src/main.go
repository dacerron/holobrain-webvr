package main

import (
	"./comm"
	"fmt"
	"log"
	"net/http"
)

func main() {
	server := new(comm.Server)

	http.HandleFunc("/teacher/createSession", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("request at create session")
		id := server.GenerateSession()
		w.Header().Set("Content-Type", "text/plain")
		w.Write([]byte(id))
	})

	http.HandleFunc("/teacher/shareHighlight", func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case "POST":
				r.ParseForm()
				buf := make([]byte, 4096)
				r.Body.Read(buf)
				//fmt.Println("calling ReceiveHighlight with", string(buf))
				server.ReceiveHighlight(r.Form["id"][0], buf)
				w.Write([]byte("ack"))
			default:
				http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
			}
	})

	http.HandleFunc("/teacher/shareInfo", func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case "POST":
				r.ParseForm()
				buf := make([]byte, 4096)
				r.Body.Read(buf)
				server.ReceiveInfo(r.Form["id"][0], buf)
				w.Write([]byte("ack"))
			default:
				http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
			}
	})

	http.HandleFunc("/student/requestInfo", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			r.ParseForm()
			//fmt.Println("got info request")
			w.Header().Add("Content-Type", "text/plain")
			w.Write(server.RegisterStudentInfoRequest(r.Form["id"][0]))
		default:
			http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		}
	})

	http.HandleFunc("/student/requestHighlight", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			r.ParseForm()
			//fmt.Println("got highlight request")
			w.Header().Add("Content-Type", "text/plain")
			w.Write(server.RegisterStudentHighlightRequest(r.Form["id"][0]))
		default:
			http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		}
	})

	http.Handle("/", http.FileServer(http.Dir("/Users/WorkLearn/Documents/Dante/HIVE/holobrain-webvr/src/public/")))
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
