package model;

import lombok.Getter;
import lombok.Setter;

public @Getter @Setter class ResultCommon {
    private String resultCode;
    private String resultMessage;

    public ResultCommon(){}

    public ResultCommon(String resultCode, String resultMessage){
        this.resultCode = resultCode;
        this.resultMessage = resultMessage;
    }
}
