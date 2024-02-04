const Error500 = (props: any) => {
 const { errorData } = props
 return (
  <>
   <div>
    {/* <Layout> */}
    <h1>500 Error</h1>
    {errorData.data}
    {/* </Layout> */}
   </div>
  </>
 )
}

export default Error500