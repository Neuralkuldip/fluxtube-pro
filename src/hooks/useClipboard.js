export default async function useClipboard(

  setUrl
) {

  try {

    const text =
      await navigator
        .clipboard
        .readText();

    setUrl(text);

  }

  catch (err) {

    console.log(err);
  }
}