import React,{useState,useEffect} from 'react';
import {Paper ,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button,CssBaseline} from '@material-ui/core';
import {Link,useNavigate} from 'react-router-dom';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const steps=['shippping address','paymentDetails'];

const Checkout = ({cart,order,onCaptureCheckout,error}) => {
    const classes= useStyles();
    const navigate = useNavigate();
    const [activeStep,setActiveStep] = useState(0);
    const [checkoutToken,setCheckoutToken] = useState(null);
    const [shippingData,setShippingData] = useState({});
    const [isFinished,setIsFinished] = useState(false);

    useEffect(() => {
        const generateToken = async () => {
            console.log(cart);
            try{
                const token = await commerce.checkout.generateToken(cart.id ,{type:"cart"});
                console.log(token);
                setCheckoutToken(token);
            }catch(error){
                navigate('/');
            }
        }

        generateToken();
    },[cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep +1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep -1);

    const next = (data)=>{
        setShippingData(data);

        nextStep();
    }

    const timeout = () => {
        setTimeout(()=>{
            setIsFinished(true);
        },3000);
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your Purchase ,{order.customer.firstname} {order.customer.lastname} </Typography>
                <Divider className={classes.divider}/>
                <Typography variant="subtitle2">Order ref: {order.customer_reference} </Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : isFinished ? (
        <>
        <div>
            <Typography variant="h5">Thank you for your Purchase </Typography>
            <Divider className={classes.divider}/>
        </div>
        <br/>
        <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
    </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if(error){
        <>
            <Typography variant="h5">error</Typography>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
        : <PaymentForm 
            shippingData={shippingData} 
            checkoutToken={checkoutToken} 
            backStep ={backStep} 
            onCaptureCheckout={onCaptureCheckout} 
            nextStep={nextStep}
            timeout={timeout}
        />

    return (
        <>
        <CssBaseline/>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout
