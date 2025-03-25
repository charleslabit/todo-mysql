import { Center, Loader as MLoader } from "@mantine/core";
export const Loader = () => {
  return (
    <Center mih={"100vh"}>
      <MLoader size="xl" type="bars" color="#198ffd" />
    </Center>
  );
};
