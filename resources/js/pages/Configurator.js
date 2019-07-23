import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));


function getSteps() {
    return ['Select house furniture', 'Select energy', 'Select color', 'Congratulation your product is ready'];
}

function getStepContent(step) {
    var chair = localStorage.getItem('chair') 

    switch (step) {
        case 0:
            return `Select one of the item you would like to customize`;
        case 1:
            // if(tchair == 1){
            //  return 'Wich fabric you wanna use';
            // }
            return 'Now select wich energy you would like to use';
        case 2:
            return `Finally add your color`;
        case 3:
            return `Thank you`;
        default:
            return 'Unknown step';
    }
}

export default function VerticalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    function handleNext(e) {
        var i = e.target.dataset
        console.log(i)
        if(i == 'chair'){
            console.log('chair ok')
            localStorage.setItem('chair', 1)
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    function handleReset() {
        setActiveStep(0);
    }

    return (
        
        <div style={{textAlign: 'center'}} className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                  </Button>

                                    {activeStep == 0 &&
                                        <div>
                                            <Button
                                                variant="contained"
                                                color="primary"

                                                onClick={handleNext}
                                                className={classes.button}
                                                data-key="chair"
                                                value="chair"

                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Chair'}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                data-key="portal"
                                                value="portal"


                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Portal'}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                data-key="lights"
                                                value="lights"

                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Lights'}
                                            </Button>
                                        </div>
                                    }
                                    {/* {localStorage.getItem('chair') == 1 &&
                                        <div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                value="chair"

                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Leather'}
                                            </Button>
                                            <Button
                                                value="portal"
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}

                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Normal fabric'}
                                            </Button>
                                        </div>
                                    } */}
                                    {activeStep == 1 &&
                                        <div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                value="solar"

                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Solar'}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                value="battery"

                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Battery'}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                value="electricity"
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Basic Electricity'}
                                            </Button>
                                        </div>
                                    }
                                    {activeStep == 2 &&
                                        <div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                value="solar"
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Black'}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                value="battery"

                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'White'}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                value="electricity"
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Yellow'}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                                value="electricity"
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Blue'}
                                            </Button>
                                        </div>
                                    }

                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
          </Button>
                </Paper>
            )}
        </div>
    );
}