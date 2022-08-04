import { Container } from "@chakra-ui/react";
import { CreateAccountForm } from "components/create-account-page/create-account-form";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const CreateAccount: NextPage = () => {
  return (
    <>
      <NextSeo title="Criar Conta" />
      <Container variant="centered">
        <CreateAccountForm />
      </Container>
    </>
  );
};

export default CreateAccount;
