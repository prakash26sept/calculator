import React, { useState } from 'react';
//import logo from './logo.svg';
// import './App.css';
import { makeStyles, createStyles } from '@material-ui/core';

const style = makeStyles(theme => createStyles({
    '@global': {

    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        width: '100%',
        justifyContent: 'space-between'
    },
    calculatorMain: {
        width: '40%',
        marginTop: '20px',
        backgroundColor: '#c4c4c4',
        display: 'flex',
        paddingBottom: '50px',
        border: '2px solid #bfbfbf',
        margin: 'auto',
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        '&>div': {
            width: '97%',
            margin: '10px 0',
            '&>div': {
                width: '97%',
                margin: 'auto',

                '&>div': {
                    // border: '1px solid black',
                    // backgroundColor: 'grey',
                    width: '98%',
                    // height: '50px',
                    display: 'flex',
                    fontSize: '40px',
                    // margin: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '5px 0',
                    margin: '5px 5px',
                    borderRadius: '4px',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }
            }
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    },
    history: {
        // width: '90%',
        // border: '1px solid aqua',
        borderRadius: '4px',
        padding: '5px',
        backgroundColor: '#dbdbdb',
        '&:hover': {
            cursor: 'pointer'
        },
        width: '97%'
    },
    resultBox: {
        // border: '1px solid aqua',
        // borderRadius: '4px',
        height: '30px',
        textAlign: 'right',
        padding: '5px',
        backgroundColor: '#f7f7f7',
        height: '100%',
        width: '97%'
    },
    blue: {
        color: '#77bbd4'
    },
    green: {
        color: 'green'
    },
    lightGrey: {
        backgroundColor: '#dbdbdb',

        '&:hover': {
            backgroundColor: '#cccccc'
        }

    },
    white: {
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: '#dbdbdb',
            // color: 'white'
        }
    },
    currentResult: {
        fontSize: '30px'
    },
    logo: {
        display: 'flex',
        flexDirection: 'flex-start'
    },
    historyBox: {
        display: 'none'
    },
    historyRow: {
        // important,
        display: 'flex!important',
        justifyContent: 'space-between!important',
        width: '90%!important'
    }
}

));

function Calculator() {

    const classes = style();
    const [mainResult, setMainResult] = useState(0);
    const [result, setResult] = useState(0);
    const [history, setHistory] = useState([]);

    const buttonEntered = (e) => {

        let val = e.target.id;

        if ((isNaN(val) === false) || val === '+' || val === '-' || val === '/' || val === '*' || val === '.') {

            if (result === 0) {
                if ((val === '+' || val === '-' || val === '*' || val === '/')) {
                    setResult(0);
                    // setMainResult(mainResult + val)
                }
                else
                    setResult(val);
            }
            else
                if ((val === '+' || val === '-' || val === '*' || val === '/')) {
                    if (mainResult === 0) {
                        setMainResult(result + val);
                        setResult(0);
                    }
                    else {
                        setMainResult(mainResult + result + val);
                        setResult(0)
                    }
                }
                else {
                    if ((isNaN(val) === false) || val === '.') {
                        setResult(result + val);
                    }
                }

        }

        if (val === '=') {
            setResult(eval(mainResult + result));
            let str = mainResult.substring(0, mainResult.length - 1);

            console.log(str);

            // if (result !== 0)
            history.push(mainResult + result + " =" + eval(mainResult + result))

            // else
            //     history.push(str + " " + "=" + " " + eval(str));

            setMainResult(0);
            console.log(history);
        }

        if (val === 'clearEntry') {
            setResult(0);
        }

        if (val === 'clear') {
            setResult(0);
            setMainResult(0);
        }

        if (val === 'delete') {
            let str = result;
            str = str.substring(0, str.length - 1);
            if (str === "") {
                str = "0";
            }
            setResult(str);
        }

    };

    const showHistory = () => {
        if (document.getElementById('buttons').style.display === 'block') {
            document.getElementById('buttons').style.display = 'none';
            document.getElementById('history').style.display = 'block';
        }
        else {
            document.getElementById('buttons').style.display = 'block';
            document.getElementById('history').style.display = 'none';
        }
    }

    const deleteHistory = (e) => {
        let index = e.target.id;

        let oldHistory = history;

        oldHistory.splice(index, 1);

        // console.log(history);

        setHistory(oldHistory);
    }

    const showHistoryChecker = () => {

        if (history.length !== 0) {
            return (<div>
                {history.map((val, index) => {
                    return <div className={classes.historyRow}>
                        <div className={classes.delete} onClick={deleteHistory} key={index} id={index}><img src="trash.png" alt="delete-history" /></div>
                        <div>{val}</div>
                    </div>
                })}
            </div>)
        }
        else {
            return (
                <div>No History Found</div>
            )
        }
    }

    return (
        <div className={classes.calculatorMain}>
            <div className={classes.logo}><img src="casio.png" alt="casio" /></div>
            <div className={classes.resultBox}>
                <div>{mainResult}</div>
                <div className={classes.currentResult}>{result}</div>
            </div>

            <div className={classes.history} onClick={showHistory}><img src="history.png" alt="back" /></div>
            <div className={classes.buttons} id="buttons">
                <div className={classes.buttonRow}>
                    <div className={`${classes.blue} ${classes.lightGrey}`} onClick={buttonEntered} id="clearEntry">CE</div>
                    <div className={`${classes.blue} ${classes.lightGrey}`} onClick={buttonEntered} id="clear">C</div>
                    <div className={`${classes.blue} ${classes.lightGrey}`} onClick={buttonEntered} id="delete"><img src="left.png" alt="back" /></div>
                    <div className={`${classes.blue} ${classes.lightGrey}`} onClick={buttonEntered} id="/">÷</div>
                </div>
                <div className={classes.buttonRow}>
                    <div className={classes.white} onClick={buttonEntered} id="7">7</div>
                    <div className={classes.white} onClick={buttonEntered} id="8">8</div>
                    <div className={classes.white} onClick={buttonEntered} id="9">9</div>
                    <div className={`${classes.blue} ${classes.lightGrey}`} onClick={buttonEntered} id="*">x</div>
                </div>
                <div className={classes.buttonRow}>
                    <div className={classes.white} onClick={buttonEntered} id="4">4</div>
                    <div className={classes.white} onClick={buttonEntered} id="5">5</div>
                    <div className={classes.white} onClick={buttonEntered} id="6">6</div>
                    <div className={`${classes.blue} ${classes.lightGrey}`} onClick={buttonEntered} id="-">-</div>
                </div>
                <div className={classes.buttonRow}>
                    <div className={classes.white} onClick={buttonEntered} id="1">1</div>
                    <div className={classes.white} onClick={buttonEntered} id="2">2</div>
                    <div className={classes.white} onClick={buttonEntered} id="3">3</div>
                    <div className={`${classes.blue} ${classes.lightGrey}`} onClick={buttonEntered} id="+">+</div>
                </div>
                <div className={classes.buttonRow}>
                    <div className={classes.lightGrey} onClick={buttonEntered} id="+-">+-</div>
                    <div className={classes.white} onClick={buttonEntered} id="0">0</div>
                    <div className={classes.lightGrey} onClick={buttonEntered} id=".">.</div>
                    <div className={`${classes.green} ${classes.lightGrey}`} onClick={buttonEntered} id="=">=</div>
                </div>
            </div>

            <div className={classes.historyBox} id="history">
                {showHistoryChecker()}
            </div>



        </div>
    );
}

export default Calculator;
