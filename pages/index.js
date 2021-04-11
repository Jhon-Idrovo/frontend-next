import { useRouter } from "next/router";

import { useEffect } from "react";

function Home({ isLoged }) {
  const router = useRouter();
  useEffect(() => {
    if (isLoged) {
      router.push("/save-expenses/");
    } else {
      router.push("/login/");
    }
  }, []);

  return <div></div>;
}

export default Home;
