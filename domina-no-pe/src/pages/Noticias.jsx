import NewsCard from "../components/NewsCard";

const Noticias = () => {
  const allNews = [
    {
      id: 1,
      imageSrc: "https://via.placeholder.com/600x400?text=Notícia+1",
      title: "Título da Notícia Completa 1",
      description: "Esta é a descrição detalhada da primeira notícia. Ela fala sobre o último jogo e as novidades do time. Aqui o texto pode ser um pouco mais longo para mostrar mais detalhes.",
      link: "#"
    },
    {
      id: 2,
      imageSrc: "https://via.placeholder.com/600x400?text=Notícia+2",
      title: "Título da Notícia Completa 2",
      description: "Conteúdo sobre a preparação do time para o próximo campeonato. A matéria inclui entrevistas com as jogadoras e o técnico, e fotos exclusivas.",
      link: "#"
    },
    {
      id: 3,
      imageSrc: "https://via.placeholder.com/600x400?text=Notícia+3",
      description: "A descrição dessa notícia é sobre a nova iniciativa de escolinhas de futebol feminino para crianças e adolescentes, incentivando a próxima geração de jogadoras.",
      link: "#"
    },
    {
      id: 4,
      imageSrc: "https://via.placeholder.com/600x400?text=Notícia+4",
      title: "Título da Notícia Completa 4",
      description: "A equipe de analistas do Domina no Pé fez uma análise tática do último jogo. Confira os principais pontos e o que esperar do próximo confronto.",
      link: "#"
    }
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Notícias</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allNews.map(item => (
          <NewsCard
            key={item.id}
            imageSrc={item.imageSrc}
            title={item.title}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Noticias;