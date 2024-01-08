export const fecthData = async () => {
  const data = await fetch(
    "http://localhost:4000/api/cards/id/maratnbttvilladerota",
    { cache: "force-cache" }
  );
  const qdata = await data.json();

  return qdata;
};

/*export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          card: "orbeariojaalavesawinegravel",
        },
      },
      {
        params: {
          card: "marchabttdesanromndecampezo",
        },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      marchabttdesanromndecampezo: {
        title: "Post 1",
        description: "Lorem ipsum dolor sit amet...",
        date: "Oct 10, 2022",
      },
    },
  };
}*/

export default async function Page({ params, id }) {
  console.log("tets");
  const { slug } = params;
  const card = await fecthData(slug);
  const { titleCard } = card.msg[0];

  return <div>{titleCard}</div>;
}
