import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Container from "@mui/material/Container";
import HomePage from "components/pages/Home";

import { getSets, getSetsReqSettings } from "utils/api";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <Container maxWidth="lg">
      <HomePage {...props} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<{
  setsResponse: IGetSetsResponse;
  setsSettings: IGetSetsReqSettingsResponse;
}> = async (ctx) => {
  const setsResponse = await getSets(ctx.query);
  const setsSettings = await getSetsReqSettings();

  return { props: { setsResponse, setsSettings } };
};
