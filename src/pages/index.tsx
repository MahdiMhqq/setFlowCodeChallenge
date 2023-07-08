import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Container from "@mui/material/Container";
import HomePage from "components/pages/Home";

import { getSets } from "utils/api";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <Container maxWidth="lg">
      <HomePage sets={props.setResponse.items} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<{
  setResponse: IGetSetsResponse;
}> = async (ctx) => {
  const setResponse = await getSets(ctx.params);

  return { props: { setResponse } };
};
