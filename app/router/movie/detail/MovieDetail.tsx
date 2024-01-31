import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from "@remix-run/react";
import DetailComponent from '~/components/detail/DetailComponent';
import { IProps } from '~/interface/IProps';

//* 라우트 이동시 먼저 실행되며, 이곳에서 데이터 연동처리를 진행 후 리턴한다. (서버사이드 처리)
export async function loader({ params }: LoaderFunctionArgs) {
  // const url = new URL(request.url).searchParams.get('id') // use queryParams
  console.log('params', params)
  return json({ ok: true, id: params.id })
}

//* 컴포넌트
//* 로더(서버사이드)에서 데이터 처리 후 컴포넌트에서 사용
export default function Detail() {
  const data = useLoaderData<typeof loader>() as IProps
  return <DetailComponent {...data} />
}

//* 양식 제출 (update ...)
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log('body', formData.get('query'))

  return json({ ok: true })
}