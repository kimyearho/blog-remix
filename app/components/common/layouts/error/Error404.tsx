const Error404 = (props: any) => {
 const { errorData } = props
 return (
  <>
   <div>
    {/* <Layout> */}
    <h1>404 Error!</h1>
    {errorData.data}
    {/* </Layout> */}
   </div>
  </>
 )
}

export default Error404