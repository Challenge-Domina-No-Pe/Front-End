import NewsCard from "../components/NewsCard";
import Footer from "../components/Footer";

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
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Domina no Pé</h1>
      <p className="text-lg text-gray-700 mb-8">
        A sua plataforma de conteúdo sobre futebol feminino. Fique por dentro das últimas notícias,
        eventos e peneiras do esporte.
      </p>

      <h2 className="text-3xl font-semibold mb-6 mt-12">Últimas Notícias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <Footer />
    </div>
  );
};

export default Home;