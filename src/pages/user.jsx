import {
    Space,
    Center,
    Text,
    Paper,
    Divider, 
    Container
  } from "@mantine/core";



export default function User() {

    return(
        <>
        <Divider
        my="xs"
        label={
          <>
            <Text fw={444} fz="xl">
            Profile
            </Text>
          </>
        }
        labelPosition="center"
      />

<Space h="lg"/>
</>
    )
}