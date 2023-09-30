import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { ExplorePublicationsQuery } from "../graphql/generated";
import { Paper, UnstyledButton, Text, Space, Avatar, Group, Spoiler, Tooltip, TypographyStylesProvider, Image, ActionIcon, Center, Container } from "@mantine/core";
import {
  IconHeart,
  IconDiamond,
  IconRecycle,
  IconMessageCircle,
  IconScriptPlus,
  IconScriptMinus,
  IconMessageShare,
  IconCheck,
  IconStack3
} from "@tabler/icons-react";

type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
};

export default function FeedPost({ publication }: Props) {
  console.log(publication);

  const replaceURLs = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const atSymbolRegex = /(\S*@+\S*)/g;

    return text
      .replace(urlRegex, (url: string) => `<a href="${url}" target="_blank">${url}</a>`)
      .replace(atSymbolRegex, (match: string) => ` ${match} `);
  };

  return (
    <>
    
    <Paper shadow="xl" radius="md" withBorder p="xl">
    <Container size="responsive">
      <UnstyledButton component={Link}  href={`/profile/${publication.profile.handle}`}>
        <Group justify="center">
        <Avatar
        // @ts-ignore
        src={publication?.profile?.picture?.original?.url || ""}
        alt={publication.profile.name || publication.profile.handle}
        size="lg" 
        />

       
         <Text fw={500} c="dimmed" > {publication.profile.name || publication.profile.handle}</Text>
         </Group>
      </UnstyledButton>
      <Space h="xl" />
      <Group justify="center">
      <Spoiler
                  maxHeight={222}
                  showLabel={
                    <>
                      <Space h="xs" />
                      <Tooltip label="Show More">
                        <IconScriptPlus />
                      </Tooltip>
                    </>
                  }
                  hideLabel={
                    <>
                      <Space h="xs" />
                      <Tooltip label="Show Less">
                        <IconScriptMinus />
                      </Tooltip>
                    </>
                  }
                >
                   
                   <div
          style={{
            maxWidth: "100%", // Adjust this value to control the maximum width
            margin: "0 auto", // Center the content horizontally if needed
          }}
        >
                   
                 
                    <Text
                     align="center"
                      size="md"
                      dangerouslySetInnerHTML={{
                        __html: replaceURLs(publication.metadata.content.replace(/\n/g, "<br> ")),
                      }}
                    />
                
         </div>
             
                </Spoiler>
                </Group>
                <Space h="md"/>
        {/* Image / media of the post if there is one */}
        {(publication.metadata.image ||
          publication.metadata.media?.length > 0) && (
            <Group justify="center">
                    <UnstyledButton
                      
                    >
                      <Image
                         src={
                          publication.metadata.image ||
                          publication.metadata.media[0].original.url
                        }
                        alt={publication.metadata.name || ""}
                        radius="md"
                       
                        fit="contain"
                      />
                    </UnstyledButton>
                  </Group>
          
        )}
 


              
                  
                  <Space h="xl" />
                  
<Group justify="center">
                  <Tooltip
                   
                    withArrow
                    position="bottom"
                    label="Reposts"
                  >
                    <ActionIcon
                     
                      variant="subtle"
                      radius="md"
                      size={36}
                    >
                      <IconRecycle
                        
                        size={18}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Tooltip>
                  <Text size="xs" c="dimmed">
                  {publication.stats.totalAmountOfMirrors} 
                  </Text>

               

                  <Tooltip
                
                    withArrow
                    position="bottom"
                    label="Collects"
                  >
                    <ActionIcon
                      
                      variant="subtle"
                      radius="md"
                      size={36}
                    >
                      <IconStack3
                       
                        size={18}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Tooltip>
                  <Text size="xs" c="dimmed">
                  {publication.stats.totalAmountOfCollects}
                  </Text>

                 

                  <Tooltip
                   
                    withArrow
                    position="bottom"
                    label="Comments"
                  >
                    <ActionIcon
                    
                      variant="subtle"
                      radius="md"
                      size={36}
                    >
                      <IconMessageCircle size={18} stroke={1.5} />
                    </ActionIcon>
                  </Tooltip>
                  <Text size="xs" c="dimmed">
                  {publication.stats.totalAmountOfComments} 
                  </Text>
             </Group>
                </Container>
    </Paper>
    
    <Space h="lg"/>
    </>
  );
}
