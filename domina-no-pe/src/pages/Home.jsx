import NewsCard from "../components/NewsCard";
import Footer from "../components/Footer";
import logo from "../assets/Dominalogo.png";

const Home = () => {
  const newsItems = [
    {
      id: 1,
      imageSrc: "https://via.placeholder.com/400x200",
      title: "Título da Notícia 1",
      description: "Esta é a descrição da primeira notícia. Ela é um pouco longa para demonstrar o efeito de 'clamp'.",
      link: "#"
    },
    {
      id: 2,
      imageSrc: "https://via.placeholder.com/400x200",
      title: "Título da Notícia 2",
      description: "Descrição da segunda notícia.",
      link: "#"
    },
    {
      id: 3,
      imageSrc: "https://via.placeholder.com/400x200",
      title: "Título da Notícia 3",
      description: "Mais uma notícia de exemplo para preencher o espaço e ver o layout.",
      link: "#"
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <img src={logo} alt="Logo" className="w-24 h-24 sm:w-20 sm:h-20 object-contain" />
        <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
          Bem-vindo ao Domina no Pé
        </h1>
      </div>

      <p className="text-lg text-gray-700 mb-8 text-center sm:text-left">
        A sua plataforma de conteúdo sobre futebol feminino. Fique por dentro das últimas notícias,
        eventos e peneiras do esporte.
      </p>

      {/* Título da seção */}
      <h2 className="text-3xl font-semibold mb-6 mt-12 text-center sm:text-left">
        Últimas Notícias
      </h2>

      {/* Grid de notícias */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map(item => (
          <NewsCard
            key={item.id}
            imageSrc={item.imageSrc}
            title={item.title}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
