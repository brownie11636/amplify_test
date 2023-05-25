import { useRouter } from "next/router";
import { useEffect } from "react";

const MyPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/myPage/account");
  }, []);
  return <div></div>;
};
export default MyPage;
