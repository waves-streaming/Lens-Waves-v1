import React from "react";
import { useProfileQuery, usePublicationsQuery } from "../../graphql/generated";
import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";
import { MediaRenderer, Web3Button } from "@thirdweb-dev/react";
import FeedPost from "../../components/FeedPost";
import {
  LENS_CONTRACT_ABI,
  LENS_CONTRACT_ADDRESS,
} from "../../const/contracts";
import { useFollow } from "../../lib/useFollow";
import { Card, Image, Avatar, Group, Text, Space, Divider} from "@mantine/core";

type Props = {};

export default function ProfilePage({}: Props) {
  const router = useRouter();
  // Grab the path / [id] field from the URL
  const { id } = router.query;

  const { mutateAsync: followUser } = useFollow();

  const {
    isLoading: loadingProfile,
    data: profileData,
    error: profileError,
  } = useProfileQuery(
    {
      request: {
        handle: id,
      },
    },
    {
      enabled: !!id,
    }
  );

  const {
    isLoading: isLoadingPublications,
    data: publicationsData,
    error: publicationsError,
  } = usePublicationsQuery(
    {
      request: {
        profileId: profileData?.profile?.id,
      },
    },
    {
      enabled: !!profileData?.profile?.id,
    }
  );

  if (publicationsError || profileError) {
    return <div>Could not find this profile.</div>;
  }

  const replaceURLs = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const atSymbolRegex = /(\S*@+\S*)/g;

    return text
      .replace(urlRegex, (url: string) => `<a href="${url}" target="_blank">${url}</a>`)
      .replace(atSymbolRegex, (match: string) => ` ${match} `);
  };

  return (
    <div className={styles.profileContainer}>
       <Card shadow="sm" padding="lg" radius="md" withBorder>
       <Card.Section>
        {/* @ts-ignore */}
          <Image
           // @ts-ignore
            src={profileData?.profile?.coverPicture?.original?.url || ""}
            alt={
              profileData?.profile?.name || profileData?.profile?.handle || ""
            }
            height={200}
            fallbackSrc="https://www.hdwallpaper.nu/wp-content/uploads/2015/07/Ocean-wave-stock-image_WEB.jpg"
          />
        </Card.Section>
        
        
    
          <Avatar
            // @ts-ignore
            src={profileData?.profile?.picture?.original?.url}
            alt={profileData?.profile?.name || profileData?.profile?.handle || ""}
            className={styles.avatar}
            size={80}
        radius={80}
        mx="auto"
        mt={-30}
          />
      
{/* Profile Handle */}
<Group justify="center" className={styles.profileHandle}>
          @{profileData?.profile?.handle || "anonuser"}
        </Group>
        {/* Profile Name */}
        <Group justify="center" className={styles.profileName}>
          <Text c="dimmed" fw={500}>{profileData?.profile?.name || "Anon User"}</Text>
        </Group>
        
<Space h="md"/>
      
        <Text
        align="center"
            fz="sm"
            style={{
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "wrap",
            }}
            dangerouslySetInnerHTML={{
              __html:
              profileData && profileData.profile && profileData.profile.bio 
                  ? replaceURLs(profileData.profile.bio.replace(/\n/g, "<br> "))
                  : "",
            }}
          />
<Space h="xl"/>
      <Group justify="center">

      
      <Text fw={500} fz="sm">
          {profileData?.profile?.stats.totalFollowers} {" Followers"}
        </Text>
       
          <Text fw={500} fz="sm">
          {profileData?.profile?.stats.totalFollowing} {" Following"}
        </Text>
        </Group>

        <Space h="md"/>
        <Group justify="center"> 
        <Web3Button
          contractAddress={LENS_CONTRACT_ADDRESS}
          contractAbi={LENS_CONTRACT_ABI}
          action={async () => await followUser(profileData?.profile?.id)}
        >
          Follow User
        </Web3Button>
        </Group>

        </Card>
        <Space h="md"/>
        <div className={styles.publicationsContainer}>
          {isLoadingPublications ? (
            <div>Loading Publications...</div>
          ) : (
            // Iterate over the items in the publications array
            publicationsData?.publications.items.map((publication) => (
              <FeedPost publication={publication} key={publication.id} />
            ))
          )}
        
      </div>
     
    </div>
  );
}
