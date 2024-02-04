const ErrorInspection = (props: any) => {
 const { errorData } = props
 return (
  <>
   <div>
    {/* <Layout> */}
    <h1>서비스 점검중!</h1>
    {errorData.data}
    {/* </Layout> */}
   </div>
  </>
 )
}

export default ErrorInspection