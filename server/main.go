package main

import (
	"log"
	"net/http"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("/Users/WorkLearn/Documents/Dante/HIVE/holobrain-webvr/server/static")))
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe: ", err);
	}
}
