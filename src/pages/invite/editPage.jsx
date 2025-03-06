import React from 'react'

 
const editPage = () => {

    const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch("/my.svg") // Load SVG from the public folder
      .then((res) => res.text())
      .then((data) => setSvgContent(data))
      .catch((err) => console.error("Error loading SVG:", err));
  }, []);

  // Make SVG Text Editable
  const makeTextEditable = () => {
    document.querySelectorAll("svg text").forEach((textElement) => {
      textElement.setAttribute("contenteditable", "true");
      textElement.addEventListener("input", (e) => {
        textElement.textContent = e.target.textContent;
      });
    });
  };

  useEffect(() => {
    makeTextEditable();
  }, [svgContent]);
  return (
    <div>
           <h1 className="text-3xl font-bold underline">
        Editable SVG
      </h1>
      {/* <div dangerouslySetInnerHTML={{ __html: svgContent }} /> */}
 
    </div>
  )
}

export default editPage
