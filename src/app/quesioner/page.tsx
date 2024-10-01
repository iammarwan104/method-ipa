import { checkPhoneNumberInQuesionerPage } from "../lib/action";
import PageQuesioner from "./Components/PageQuesioner";
import WelcomeModal from "./Components/WelcomeModal";

export default async function Page() {
  return (
    <>
      <WelcomeModal/>
      <PageQuesioner/>
    </>
  );
}