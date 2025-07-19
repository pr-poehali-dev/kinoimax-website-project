import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const movies = [
  {
    id: 1,
    title: "Плагиатор",
    ageRating: "16+",
    poster: "https://m.media-amazon.com/images/M/MV5BNmY2OTFiYmYtZjFhMS00MDAxLWI0NmItYjg4YTU3NDBmZGQwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://media.cinemabox.team/net/c5/movies/12894/trailer-plagiator.mp4",
    showtimes: ["12:30", "14:50", "19:45", "22:25"]
  },
  {
    id: 2,
    title: "Супермен предсеанс. обсл. & Куда уходят папы?",
    ageRating: "12+",
    poster: "https://kinosfera-baltika.ru/media_files/movies/vertical_poster_preview/1000000000370/150114_68790004c7e067.10116531.webp",
    trailer: "https://media.cinemabox.team/net/c5/movies/1000000000370/trailer-supermen-predseans-obsl-kuda-ukhodyat-papy.mp4",
    showtimes: ["11:25", "12:55", "15:00", "16:05", "18:35", "19:35", "20:15", "22:15", "23:55"]
  },
  {
    id: 3,
    title: "Лило и Стич предсеанс. обсл. & Куда уходят папы?",
    ageRating: "6+",
    poster: "https://kinosfera-baltika.ru/media_files/movies/vertical_poster_preview/1000000000354/147965_6830cae02b9974.26300785.webp",
    trailer: "https://media.cinemabox.team/net/c5/movies/1000000000354/trailer-lilo-i-stich-predseans-obsl-kuda-ukhodyat-papy.mp4",
    showtimes: ["11:55", "14:10", "16:35", "18:35", "20:55", "22:15"]
  },
  {
    id: 4,
    title: "Как приручить дракона предсеанс. обсл. & Куда уходят папы?",
    ageRating: "12+",
    poster: "https://kinosfera-baltika.ru/media_files/movies/vertical_poster_preview/1000000000363/148704_685b0568d31802.59369405.webp",
    trailer: "https://media.cinemabox.team/net/c5/movies/1000000000363/trailer-kak-priruchit-drakona-predseans-obsl-kuda-ukhodyat-papy.mp4",
    showtimes: ["15:05", "17:55", "21:20"]
  },
  {
    id: 5,
    title: "Формула 1 предсеанс. обсл. & Куда уходят папы?",
    ageRating: "12+",
    poster: "https://kinosfera-baltika.ru/media_files/movies/vertical_poster_preview/1000000000369/149883_68760521b2b993.21002650.webp",
    trailer: "https://media.cinemabox.team/net/c5/movies/1000000000369/trailer-formula-1-predseans-obsl-kuda-ukhodyat-papy.mp4",
    showtimes: ["20:55", "23:35"]
  },
  {
    id: 6,
    title: "Материалистка",
    ageRating: "18+",
    poster: "https://kinosfera-baltika.ru/media_files/movies/vertical_poster_preview/12271/149392_6866726ab072d7.65373077.webp",
    trailer: "https://media.cinemabox.team/r/movies/12271/trailer-materialistka.mp4",
    showtimes: ["20:10"]
  },
  {
    id: 7,
    title: "28 лет спустя предсеанс. обсл. & Куда уходят папы?",
    ageRating: "18+",
    poster: "https://kinosfera-baltika.ru/media_files/movies/vertical_poster_preview/1000000000368/150110_6878bd395a04e3.07287001.webp",
    trailer: "https://media.cinemabox.team/net/c5/movies/1000000000368/trailer-28-let-spustya-predseans-obsl-kuda-ukhodyat-papy.mp4",
    showtimes: ["21:10", "23:45"]
  },
  {
    id: 8,
    title: "Пила X",
    ageRating: "18+",
    poster: "https://kinosfera-baltika.ru/media_files/movies/vertical_poster_preview/10780/150106_6878aba5700005.24408322.webp",
    trailer: "https://media.cinemabox.team/r/movies/10780/trailer-pila-x.mp4",
    showtimes: ["22:15"]
  }
];

const Index = () => {
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<{movieId: number, time: string} | null>(null);
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(true);

  const generateSeatMap = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    const occupiedSeats = ['A3', 'A4', 'B7', 'C2', 'E8', 'F5', 'F6'];
    
    return rows.map(row => 
      Array.from({length: seatsPerRow}, (_, i) => ({
        id: `${row}${i + 1}`,
        row,
        number: i + 1,
        occupied: occupiedSeats.includes(`${row}${i + 1}`)
      }))
    );
  };

  const seatMap = generateSeatMap();

  return (
    <div className="min-h-screen bg-[#1F2937]">
      {/* Hero Section with Background Video */}
      <div className="relative h-screen overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop
          src="https://media.cinemabox.team/net/c5/movies/1000000000370/trailer-supermen-predseans-obsl-kuda-ukhodyat-papy.mp4"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Header */}
        <header className="relative z-10 flex justify-between items-center p-6">
          <h1 className="text-3xl font-bold text-white">KINOIMAX</h1>
          <nav className="flex space-x-6">
            <Button variant="ghost" className="text-white hover:text-[#EBB924]">Афиша</Button>
            <Button variant="ghost" className="text-white hover:text-[#EBB924]">Контакты</Button>
            <Button variant="ghost" className="text-white hover:text-[#EBB924]">О нас</Button>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center items-start h-full pl-12">
          <div className="max-w-lg">
            <h2 className="text-6xl font-bold text-white mb-4">Супермен в кино!</h2>
            <Badge className="bg-[#EBB924] text-black font-bold mb-6">12+</Badge>
            <Button 
              className="bg-[#EBB924] text-black hover:bg-[#EBB924]/90 font-bold px-8 py-3"
              onClick={() => setHeroVideoPlaying(!heroVideoPlaying)}
            >
              <Icon name="Play" className="mr-2" size={20} />
              Смотреть трейлер
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <Icon name="ChevronDown" className="text-white animate-bounce" size={32} />
        </div>
      </div>

      {/* Movies Section */}
      <section className="py-16 px-6 bg-[#1F2937]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Афиша фильмов</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <Card key={movie.id} className="bg-[#374151] border-gray-600 overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="relative">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-full h-80 object-cover"
                  />
                  
                  {/* Play button overlay */}
                  <div 
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                    onClick={() => setSelectedTrailer(movie.trailer)}
                  >
                    <div className="bg-[#EBB924] rounded-full p-4">
                      <Icon name="Play" className="text-black" size={32} />
                    </div>
                  </div>
                  
                  {/* Age rating badge */}
                  <Badge className="absolute top-3 right-3 bg-[#EBB924] text-black font-bold">
                    {movie.ageRating}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="text-white font-bold mb-4 min-h-[3rem] line-clamp-2">{movie.title}</h3>
                  
                  <div className="space-y-2">
                    <p className="text-gray-300 text-sm font-semibold mb-2">Расписание сеансов:</p>
                    <div className="flex flex-wrap gap-2">
                      {movie.showtimes.map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          size="sm"
                          className="border-[#EBB924] text-[#EBB924] hover:bg-[#EBB924] hover:text-black"
                          onClick={() => setSelectedSeat({movieId: movie.id, time})}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trailer Modal */}
      <Dialog open={!!selectedTrailer} onOpenChange={() => setSelectedTrailer(null)}>
        <DialogContent className="max-w-4xl bg-black border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-white">Трейлер фильма</DialogTitle>
          </DialogHeader>
          {selectedTrailer && (
            <video 
              className="w-full h-auto"
              controls 
              autoPlay
              src={selectedTrailer}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Seat Selection Modal */}
      <Dialog open={!!selectedSeat} onOpenChange={() => setSelectedSeat(null)}>
        <DialogContent className="max-w-4xl bg-[#1F2937] border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-white">Выбор мест в зале</DialogTitle>
            {selectedSeat && (
              <p className="text-gray-300">
                {movies.find(m => m.id === selectedSeat.movieId)?.title} - {selectedSeat.time}
              </p>
            )}
          </DialogHeader>
          
          <div className="py-6">
            {/* Screen */}
            <div className="mb-8">
              <div className="w-full h-4 bg-gradient-to-r from-transparent via-white to-transparent mb-2 rounded"></div>
              <p className="text-center text-gray-400 text-sm">ЭКРАН</p>
            </div>
            
            {/* Seat Map */}
            <div className="space-y-3">
              {seatMap.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center space-x-2">
                  <span className="w-6 text-white text-center">{row[0].row}</span>
                  {row.map((seat) => (
                    <button
                      key={seat.id}
                      className={`w-8 h-8 rounded-t-lg border-2 transition-colors ${
                        seat.occupied 
                          ? 'bg-red-500 border-red-600 cursor-not-allowed' 
                          : 'bg-green-500 border-green-600 hover:bg-green-400'
                      }`}
                      disabled={seat.occupied}
                    >
                      <span className="text-xs text-white">{seat.number}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex justify-center space-x-6 mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-white text-sm">Свободно</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-white text-sm">Занято</span>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button className="bg-[#EBB924] text-black hover:bg-[#EBB924]/90 font-bold px-8">
                Купить билет
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#111827] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">KINOIMAX</h3>
              <p className="text-gray-400">Современный кинотеатр с лучшими фильмами</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Контакты</h4>
              <p className="text-gray-400">Телефон: +7 (999) 123-45-67</p>
              <p className="text-gray-400">Email: info@kinoimax.ru</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Адрес</h4>
              <p className="text-gray-400">г. Москва, ул. Кинематографическая, 1</p>
              <p className="text-gray-400">ТЦ "Синема Плаза", 3 этаж</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;