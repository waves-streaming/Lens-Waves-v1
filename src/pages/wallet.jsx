import {
    Space,
    Center,
    Text,
    Paper,
    Divider, 
    Container
  } from "@mantine/core";


export default function Wallet() {

    return(
        <>
        <Divider
        my="xs"
        label={
          <>
            <Text fw={444} fz="xl">
            Wallet
            </Text>
          </>
        }
        labelPosition="center"
      />

<Space h="lg"/>
      
        <Center>
            <iframe
              title="heroswap"
              width="50%"
              style={{
                border: "none",
                borderRadius: "22px",
                minHeight: "50vh",
              }}
              src="https://heroswap.com/widget?affiliateAddress=BC1YLfjx3jKZeoShqr2r3QttepoYmvJGEs7vbYx1WYoNmNW9FY5VUu6"
            />
            </Center>
            </>
    )
}