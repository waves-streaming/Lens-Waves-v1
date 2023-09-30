
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import '@mantine/core/styles.css';
import { ActionIcon, AppShell, Container, Group, MantineProvider, Tooltip } from '@mantine/core';
import { RiArrowRightDoubleLine, RiArrowLeftDoubleLine } from 'react-icons/ri';
import { useDisclosure } from '@mantine/hooks';
import { MantineHeader } from "../components/MantineAppShell/MantineHeader/MantineHeader";

export default function App({ Component, pageProps }: AppProps) {
  // the chainId our app wants to be running on
  // for our example the Polygon Mumbai Testnet
  const desiredChainId = ChainId.Polygon;
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  // Create a client
  const queryClient = new QueryClient();

  return (
    
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <QueryClientProvider client={queryClient}>
      <MantineProvider>
      <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      aside={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>

        <MantineHeader/>
      </AppShell.Header>
      <AppShell.Navbar>
        {desktopOpened ? (
        <>
         <Tooltip position="right-start" label="Close Sidebars">
      <ActionIcon onClick={toggleDesktop} visibleFrom="sm"  >
       <RiArrowLeftDoubleLine/>
     </ActionIcon>
     </Tooltip>
     </>
   
    ) : 
    <Tooltip position="right-start" label="Open Sidebars">
    <ActionIcon style={{position: 'fixed'}} onClick={toggleDesktop} visibleFrom="sm">
      <RiArrowRightDoubleLine/>
    </ActionIcon>
    </Tooltip>}
    
    </AppShell.Navbar>
    <AppShell.Aside>
  
 </AppShell.Aside>
 
      <AppShell.Main >
      {!desktopOpened ? (
          <Tooltip position="right-start" label="Open Sidebars">
      <ActionIcon onClick={toggleDesktop} visibleFrom="sm"  >
        <RiArrowRightDoubleLine/>
      </ActionIcon>
      </Tooltip>
    ) : null}
      <Container
    style={{
       
      flexDirection: 'column',
      width: '100%',
      margin: '0 auto',
      overflowX: 'hidden',
    }}
  
    size="responsive"
  >
  
        <Component {...pageProps} />
        </Container>
        </AppShell.Main>
   </AppShell>
   </MantineProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
   
  );
}
