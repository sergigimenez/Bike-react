import { useState } from "react";
import { useForm } from "../../hooks/useForm";

export const useAddRoutes = () => {
    /*Variables not-use */
    const formData = {
        titulo: '',
        distancia: '',
        desnivel: '',
        fecha: '',
        precio: '',
        linkWeb: '',
        instagram: '',
        facebook: '',
        twitter: '',
        img: ''
    }

    const formValidations = {
        titulo: [(value) => value.length > 0, 'No puede estar vacio'],
        distancia: [(value) => value.length > 0, 'No puede estar vacio'],
        desnivel: [(value) => value.length > 0, 'No puede estar vacio'],
        fecha: [(value) => value.length > 0, 'No puede estar vacio'],
        precio: [(value) => value.length > 0, 'No puede estar vacio'],
        linkWeb: [(value) => value.includes('www.'), 'tiene que incluir www.'],
        instagram: [(value) => value.includes('@'), 'tiene que incluir @'],
        twitter: [(value) => value.includes('@'), 'tiene que incluir @'],
        facebook: [(value) => value.length > 0, 'No puede estar vacio'],
    }
    /*Variables not-use */

    /*Stepper*/
    const [activeStep, setActiveStep] = useState(0)
    const handleStep = (step) => {
        onSubmit() ? setActiveStep(step) : ''
    };

    const handleNextStep = () => {
        onSubmit() ? setActiveStep(activeStep + 1) : ''
    }

    const handlePreviuosStep = () => {
        onSubmit() ? setActiveStep(activeStep - 1) : ''
    }
    /*Stepper*/

    /*UseForm*/
    
    /*UseForm*/

    /*Submit*/
    const [isSubmit, setIsSubmit] = useState(
        {
            step_0: { status: false, validations: [validations[0]], sumbit: false },
            step_1: { status: false, validations: [validations[1]], sumbit: false },
            step_2: { status: false, validations: [], sumbit: false },
            step_3: { status: false, validations: [], sumbit: false }
        })

    const onSubmit = (event) => {
        typeof event != "undefined" ? event.preventDefault() : ''
        console.log(1)
    }
    /*Submit*/


    return {
        formData,
        formValidations,
        activeStep,
        handleStep,
        handleNextStep,
        handlePreviuosStep,
        formState,
        onInputChange,
        onResetForm,
        isSubmit,
        onSubmit
    }
}
