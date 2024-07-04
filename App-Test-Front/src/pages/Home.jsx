import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import BookList from "../components/BookList";
import AuthorForm from "../components/AuthorForm";

function Home() {
  return (
    <>
      <Tabs defaultValue={0} sx={{ height: "100%" }}>
        <TabList>
          <Tab>Auteurs</Tab>
          <Tab>Livres</Tab>
        </TabList>
        <TabPanel value={0}>
          <AuthorForm />
        </TabPanel>
        <TabPanel value={1}>
          <BookList />
        </TabPanel>
      </Tabs>
    </>
  );
}

export default Home;
