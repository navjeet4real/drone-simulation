import React from 'react'
import { FormProvider as Form } from 'react-hook-form'
const FormProvider = ({children, onSubmit, methods}) => {
  return (
    <Form {...methods} >
        <form onSubmit={onSubmit}>
            {children}
        </form>
    </Form>

  )
}


export default FormProvider

// const dummyData = [
//     { lat: 37.7749, lng: -122.4194, timestamp: 1640666400000 },
//     { lat: 37.7751, lng: -122.4196, timestamp: 1640666401000 },
//     { lat: 37.7753, lng: -122.4194, timestamp: 1640666402000 },
//     { lat: 37.7755, lng: -122.4196, timestamp: 1640666403000 },
//     { lat: 37.7757, lng: -122.4194, timestamp: 1640666404000 },
//     { lat: 37.7759, lng: -122.4196, timestamp: 1640666405000 },
//     { lat: 37.7761, lng: -122.4194, timestamp: 1640666406000 },
//     { lat: 37.7763, lng: -122.4196, timestamp: 1640666407000 },
//     { lat: 37.7765, lng: -122.4194, timestamp: 1640666408000 },
//     { lat: 37.7767, lng: -122.4196, timestamp: 1640666409000 },
//     { lat: 37.7769, lng: -122.4194, timestamp: 1640666410000 },
//     { lat: 37.7767, lng: -122.4192, timestamp: 1640666411000 },
//     { lat: 37.7765, lng: -122.419, timestamp: 1640666412000 },
//     { lat: 37.7763, lng: -122.4192, timestamp: 1640666413000 },
//     { lat: 37.7761, lng: -122.419, timestamp: 1640666414000 },
//     { lat: 37.7759, lng: -122.4192, timestamp: 1640666415000 },
//     { lat: 37.7757, lng: -122.419, timestamp: 1640666416000 },
//     { lat: 37.7755, lng: -122.4192, timestamp: 1640666417000 },
//     { lat: 37.7753, lng: -122.419, timestamp: 1640666418000 },
//     { lat: 37.7751, lng: -122.4192, timestamp: 1640666419000 },
//   ];