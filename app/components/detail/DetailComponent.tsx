import { Button } from "@mui/material"
import { Form } from "@remix-run/react"
import { IProps } from "~/interface/IProps"

const DetailComponent = (props: IProps) => {
  return <>
    <div>게시글 ID: {props.id}</div>
    <Form method='post'>
      <input type="text" name="query" />
      <Button type='submit' variant="contained">전송</Button>
    </Form>
  </>
}

export default DetailComponent