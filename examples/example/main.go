package main

import (
	"encoding/json"
	"net/http"

	"github.com/labstack/echo"
)

const AUTH_KEY = "Authorization"
const AUTH_VALUE = "test"

const RESP_AUTH = "authorized"
const RESP_NOT_AUTH = "not authorized"
const RESP_EMPTY_HEADER = "no token in header"

type Resp struct {
	Result string `json:"result"`
}

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {

		resp := Resp{}
		header := c.Request().Header.Get(AUTH_KEY)
		if len(header) > 0 {
			if header == AUTH_VALUE {
				resp.Result = RESP_AUTH
			} else {
				resp.Result = RESP_NOT_AUTH
			}
		} else {
			resp.Result = RESP_EMPTY_HEADER
		}

		ans, _ := json.Marshal(resp)
		return c.String(http.StatusBadRequest, string(ans))
	})
	e.Logger.Fatal(e.Start(":3001"))
}
