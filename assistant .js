
// Assure-toi que pdf.js est bien chargé dans ton HTML :
// <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>

const url = 'data/support_chatbot.pdf';

try {
  const loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(function(pdf) {
    console.log("✅ PDF chargé avec succès !");
    // Exemple : afficher le nombre de pages
    console.log("Nombre de pages :", pdf.numPages);

    // Tu peux ajouter ici le traitement du PDF, comme afficher la première page
    pdf.getPage(1).then(function(page) {
      const scale = 1.5;
      const viewport = page.getViewport({ scale: scale });

      const canvas = document.getElementById('pdf-canvas');
      if (!canvas) {
        console.warn("⚠️ Aucun élément <canvas id='pdf-canvas'> trouvé dans la page.");
        return;
      }

      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });

  }).catch(function(error) {
    console.error("❌ Erreur lors du chargement du PDF :", error.message);
  });
} catch (e) {
  console.error("❌ Exception lors de l'accès au PDF :", e.message);
}
