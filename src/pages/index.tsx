import { Container, Space, Tabs, rem, Text, Loader, Group, Center } from "@mantine/core";
import FeedPost from "../components/FeedPost";
import {
  PublicationMainFocus,
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from "../graphql/generated";
import classes from "../styles/Home.module.css";
import { useState } from "react";
import { BsFire } from "react-icons/bs";
import { GiWaveCrest } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { Welcome } from "../components/Welcome/Welcome";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string | null>('first');

  const { isLoading, error, data } = useExplorePublicationsQuery(
    {
      request: {
        sortCriteria: PublicationSortCriteria.Latest,
      },
    },
    {
      // Don't refetch the user comes back
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  console.log(data);

  if (error) {
    return <div>Error...</div>;
  }



  return (
   <>
   <Welcome />
   <Space h="xl"/>
      <Tabs value={activeTab} onChange={setActiveTab} variant="unstyled" defaultValue="third" classNames={classes}>
      <Tabs.List grow>
        <Tabs.Tab
        value="first"
       
          leftSection={<BsFire style={{ width: rem(16), height: rem(16) }} />}
        >
          Hot Feed
        </Tabs.Tab>
        <Tabs.Tab
        value="second"
          leftSection={<GiWaveCrest  style={{ width: rem(16), height: rem(16) }} />}
        >
          Waves
        </Tabs.Tab>
        <Tabs.Tab
        value="third"
        
          leftSection={<FaUsers  style={{ width: rem(16), height: rem(16) }} />}
        >
           Following Feed
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first"> <Space h="xl"/>
    {isLoading && (
      <Loader size={33} />
    )
    }
    {data?.explorePublications.items.map((publication) => (
          <FeedPost publication={publication} key={publication.id} />
        ))}</Tabs.Panel>
    <Tabs.Panel value="second"><Space h="xl"/> <Text align="center">Coming Soon</Text><Space h={100}/></Tabs.Panel>
    <Tabs.Panel value="third"> 
    <Space h="xl"/> <Text align="center">Coming Soon</Text><Space h={100}/>
        </Tabs.Panel>
    </Tabs>

    
      <Container>
        
       
    </Container>
    </>
  );
}
