import './styles/main.css';
import logo from './assets/logo.svg';
import { MagnifyingGlassPlus } from 'phosphor-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GameBanner } from './components/GameBanner';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/Form/CreateAdModal';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ad: number;
  };
}

const App = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games/').then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logo} />

      <h1 className='text-6xl  text-white font-black mt-20'>
        Seu
        <span className='bg-nlw-gradient bg-clip-text text-transparent'>
          duo
        </span>
        está aqui
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.Ad}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
};

export default App;
