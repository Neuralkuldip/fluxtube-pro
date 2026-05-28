export default function useDragDrop(

  setUrl
) {

  const handleDrop = (e) => {

    e.preventDefault();

    const text =
      e.dataTransfer.getData(
        "text"
      );

    if (text) {

      setUrl(text);
    }
  };

  const handleDragOver = (e) => {

    e.preventDefault();
  };

  return {

    handleDrop,

    handleDragOver,
  };
}