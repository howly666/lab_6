import { useMemo, useState } from 'react'
import {
  AppBar, Toolbar, Typography, Button, Box, Container,
  Menu, MenuItem, TextField, InputAdornment, Card, CardContent,
  CardMedia, Paper, Select, FormControl, InputLabel, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Stack
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import './App.css'

import antiImg from './assets/anti.webp'
import cmImg from './assets/cm.webp'
import legionImg from './assets/legion.jpg'
import lionImg from './assets/lion.webp'
import shakerImg from './assets/sheyker.jpg'
import phantomImg from './assets/fantom.jpg'
import voidImg from './assets/void.png'
import dotaLogoImg from './assets/dota2_logo.jpg'

type Page = 'home' | 'catalog' | 'details'
type Attribute = 'Сила' | 'Ловкость' | 'Интеллект'
type AttackType = 'Ближний бой' | 'Дальний бой'
type ImageKey = 'anti' | 'cm' | 'legion' | 'lion' | 'shaker' | 'phantom' | 'void'

type Hero = {
  name: string
  roles: string[]
  attribute: Attribute
  strength: number
  agility: number
  intelligence: number
  attackType: AttackType
  imageKey?: ImageKey
  short?: string
}

const heroImages: Record<ImageKey, string> = {
  anti: antiImg,
  cm: cmImg,
  legion: legionImg,
  lion: lionImg,
  shaker: shakerImg,
  phantom: phantomImg,
  void: voidImg,
}

const heroes: Hero[] = [
  {
    "name": "Anti-Mage",
    "roles": [
      "Керри"
    ],
    "attribute": "Ловкость",
    "strength": 21,
    "agility": 24,
    "intelligence": 15,
    "attackType": "Ближний бой",
    "imageKey": "anti",
    "short": "Керри, который быстро фармит и хорошо играет против магов."
  },
  {
    "name": "Legion Commander",
    "roles": [
      "Керри",
      "Инициатор"
    ],
    "attribute": "Сила",
    "strength": 25,
    "agility": 18,
    "intelligence": 20,
    "attackType": "Ближний бой",
    "imageKey": "legion",
    "short": "Сильный инициатор, раскрывается через успешные дуэли."
  },
  {
    "name": "Lion",
    "roles": [
      "Саппорт",
      "Контролер",
      "Нукер"
    ],
    "attribute": "Интеллект",
    "strength": 18,
    "agility": 15,
    "intelligence": 22,
    "attackType": "Дальний бой",
    "imageKey": "lion",
    "short": "Саппорт с мощным контролем и большим магическим уроном."
  },
  {
    "name": "Crystal Maiden",
    "roles": [
      "Саппорт",
      "Контролер",
      "Нукер"
    ],
    "attribute": "Интеллект",
    "strength": 19,
    "agility": 16,
    "intelligence": 21,
    "attackType": "Дальний бой",
    "imageKey": "cm",
    "short": "Саппорт, который усиливает команду маной и контролем."
  },
  {
    "name": "Invoker",
    "roles": [
      "Керри",
      "Нукер",
      "Контролер"
    ],
    "attribute": "Интеллект",
    "strength": 19,
    "agility": 14,
    "intelligence": 22,
    "attackType": "Дальний бой"
  },
  {
    "name": "Earthshaker",
    "roles": [
      "Саппорт",
      "Инициатор",
      "Контролер"
    ],
    "attribute": "Сила",
    "strength": 22,
    "agility": 12,
    "intelligence": 18,
    "attackType": "Ближний бой",
    "imageKey": "shaker",
    "short": "Инициатор с сильными массовыми способностями."
  },
  {
    "name": "Juggernaut",
    "roles": [
      "Керри"
    ],
    "attribute": "Ловкость",
    "strength": 20,
    "agility": 26,
    "intelligence": 14,
    "attackType": "Ближний бой"
  },
  {
    "name": "Pudge",
    "roles": [
      "Контролер",
      "Инициатор",
      "Танк"
    ],
    "attribute": "Сила",
    "strength": 25,
    "agility": 14,
    "intelligence": 16,
    "attackType": "Ближний бой"
  },
  {
    "name": "Shadow Fiend",
    "roles": [
      "Керри",
      "Нукер"
    ],
    "attribute": "Ловкость",
    "strength": 19,
    "agility": 20,
    "intelligence": 18,
    "attackType": "Дальний бой"
  },
  {
    "name": "Storm Spirit",
    "roles": [
      "Керри",
      "Нукер",
      "Побег"
    ],
    "attribute": "Интеллект",
    "strength": 21,
    "agility": 22,
    "intelligence": 23,
    "attackType": "Дальний бой"
  },
  {
    "name": "Phantom Assassin",
    "roles": [
      "Керри"
    ],
    "attribute": "Ловкость",
    "strength": 19,
    "agility": 23,
    "intelligence": 15,
    "attackType": "Ближний бой",
    "imageKey": "phantom",
    "short": "Керри с высоким физическим уроном и критическими атаками."
  },
  {
    "name": "Riki",
    "roles": [
      "Керри",
      "Побег"
    ],
    "attribute": "Ловкость",
    "strength": 18,
    "agility": 23,
    "intelligence": 14,
    "attackType": "Ближний бой"
  },
  {
    "name": "Sniper",
    "roles": [
      "Керри",
      "Нукер"
    ],
    "attribute": "Ловкость",
    "strength": 19,
    "agility": 27,
    "intelligence": 15,
    "attackType": "Дальний бой"
  },
  {
    "name": "Templar Assassin",
    "roles": [
      "Керри",
      "Нукер"
    ],
    "attribute": "Ловкость",
    "strength": 21,
    "agility": 23,
    "intelligence": 16,
    "attackType": "Дальний бой"
  },
  {
    "name": "Ursa",
    "roles": [
      "Керри",
      "Танк"
    ],
    "attribute": "Ловкость",
    "strength": 24,
    "agility": 18,
    "intelligence": 16,
    "attackType": "Ближний бой"
  },
  {
    "name": "Lina",
    "roles": [
      "Керри",
      "Саппорт",
      "Нукер"
    ],
    "attribute": "Интеллект",
    "strength": 20,
    "agility": 23,
    "intelligence": 30,
    "attackType": "Дальний бой"
  },
  {
    "name": "Windranger",
    "roles": [
      "Керри",
      "Саппорт",
      "Нукер"
    ],
    "attribute": "Интеллект",
    "strength": 18,
    "agility": 17,
    "intelligence": 22,
    "attackType": "Дальний бой"
  },
  {
    "name": "Zeus",
    "roles": [
      "Нукер"
    ],
    "attribute": "Интеллект",
    "strength": 19,
    "agility": 11,
    "intelligence": 22,
    "attackType": "Дальний бой"
  },
  {
    "name": "Slark",
    "roles": [
      "Керри",
      "Побег"
    ],
    "attribute": "Ловкость",
    "strength": 21,
    "agility": 21,
    "intelligence": 16,
    "attackType": "Ближний бой"
  },
  {
    "name": "Faceless Void",
    "roles": [
      "Керри",
      "Контролер"
    ],
    "attribute": "Ловкость",
    "strength": 20,
    "agility": 19,
    "intelligence": 15,
    "attackType": "Ближний бой",
    "imageKey": "void",
    "short": "Керри с контролем зоны через Chronosphere."
  },
  {
    "name": "Queen of Pain",
    "roles": [
      "Керри",
      "Нукер",
      "Побег"
    ],
    "attribute": "Интеллект",
    "strength": 18,
    "agility": 22,
    "intelligence": 25,
    "attackType": "Дальний бой"
  },
  {
    "name": "Wraith King",
    "roles": [
      "Керри",
      "Саппорт",
      "Танк"
    ],
    "attribute": "Сила",
    "strength": 22,
    "agility": 16,
    "intelligence": 18,
    "attackType": "Ближний бой"
  },
  {
    "name": "Drow Ranger",
    "roles": [
      "Керри"
    ],
    "attribute": "Ловкость",
    "strength": 16,
    "agility": 21,
    "intelligence": 15,
    "attackType": "Дальний бой"
  },
  {
    "name": "Mirana",
    "roles": [
      "Керри",
      "Саппорт",
      "Побег"
    ],
    "attribute": "Ловкость",
    "strength": 18,
    "agility": 24,
    "intelligence": 22,
    "attackType": "Дальний бой"
  },
  {
    "name": "Nyx Assassin",
    "roles": [
      "Контролер",
      "Нукер",
      "Инициатор"
    ],
    "attribute": "Ловкость",
    "strength": 17,
    "agility": 21,
    "intelligence": 21,
    "attackType": "Ближний бой"
  },
  {
    "name": "Bounty Hunter",
    "roles": [
      "Побег",
      "Нукер"
    ],
    "attribute": "Ловкость",
    "strength": 20,
    "agility": 21,
    "intelligence": 22,
    "attackType": "Ближний бой"
  },
  {
    "name": "Clockwerk",
    "roles": [
      "Инициатор",
      "Контролер",
      "Танк"
    ],
    "attribute": "Сила",
    "strength": 26,
    "agility": 13,
    "intelligence": 18,
    "attackType": "Ближний бой"
  },
  {
    "name": "Omniknight",
    "roles": [
      "Саппорт",
      "Танк"
    ],
    "attribute": "Сила",
    "strength": 23,
    "agility": 15,
    "intelligence": 16,
    "attackType": "Ближний бой"
  },
  {
    "name": "Enigma",
    "roles": [
      "Контролер",
      "Инициатор",
      "Лесник"
    ],
    "attribute": "Интеллект",
    "strength": 21,
    "agility": 14,
    "intelligence": 19,
    "attackType": "Дальний бой"
  },
  {
    "name": "Tinker",
    "roles": [
      "Керри",
      "Нукер"
    ],
    "attribute": "Интеллект",
    "strength": 19,
    "agility": 13,
    "intelligence": 30,
    "attackType": "Дальний бой"
  },
  {
    "name": "Nature's Prophet",
    "roles": [
      "Керри",
      "Лесник",
      "Пушер"
    ],
    "attribute": "Интеллект",
    "strength": 21,
    "agility": 22,
    "intelligence": 23,
    "attackType": "Дальний бой"
  },
  {
    "name": "Dark Seer",
    "roles": [
      "Инициатор",
      "Лесник",
      "Побег"
    ],
    "attribute": "Интеллект",
    "strength": 22,
    "agility": 12,
    "intelligence": 21,
    "attackType": "Ближний бой"
  },
  {
    "name": "Axe",
    "roles": [
      "Инициатор",
      "Танк",
      "Контролер"
    ],
    "attribute": "Сила",
    "strength": 25,
    "agility": 20,
    "intelligence": 18,
    "attackType": "Ближний бой"
  },
  {
    "name": "Bristleback",
    "roles": [
      "Керри",
      "Танк",
      "Инициатор"
    ],
    "attribute": "Сила",
    "strength": 22,
    "agility": 17,
    "intelligence": 14,
    "attackType": "Ближний бой"
  },
  {
    "name": "Centaur Warrunner",
    "roles": [
      "Инициатор",
      "Танк",
      "Контролер"
    ],
    "attribute": "Сила",
    "strength": 27,
    "agility": 15,
    "intelligence": 15,
    "attackType": "Ближний бой"
  },
  {
    "name": "Timbersaw",
    "roles": [
      "Танк",
      "Нукер",
      "Побег"
    ],
    "attribute": "Сила",
    "strength": 25,
    "agility": 16,
    "intelligence": 19,
    "attackType": "Ближний бой"
  },
  {
    "name": "Sand King",
    "roles": [
      "Инициатор",
      "Контролер",
      "Саппорт"
    ],
    "attribute": "Сила",
    "strength": 22,
    "agility": 19,
    "intelligence": 19,
    "attackType": "Ближний бой"
  },
  {
    "name": "Tidehunter",
    "roles": [
      "Инициатор",
      "Танк",
      "Контролер"
    ],
    "attribute": "Сила",
    "strength": 27,
    "agility": 15,
    "intelligence": 18,
    "attackType": "Ближний бой"
  },
  {
    "name": "Slardar",
    "roles": [
      "Керри",
      "Танк",
      "Инициатор"
    ],
    "attribute": "Сила",
    "strength": 21,
    "agility": 17,
    "intelligence": 15,
    "attackType": "Ближний бой"
  },
  {
    "name": "Spirit Breaker",
    "roles": [
      "Инициатор",
      "Контролер",
      "Танк"
    ],
    "attribute": "Сила",
    "strength": 28,
    "agility": 17,
    "intelligence": 14,
    "attackType": "Ближний бой"
  },
  {
    "name": "Lycan",
    "roles": [
      "Керри",
      "Пушер",
      "Лесник"
    ],
    "attribute": "Сила",
    "strength": 26,
    "agility": 16,
    "intelligence": 23,
    "attackType": "Ближний бой"
  },
  {
    "name": "Chaos Knight",
    "roles": [
      "Керри",
      "Контролер",
      "Танк"
    ],
    "attribute": "Сила",
    "strength": 22,
    "agility": 18,
    "intelligence": 18,
    "attackType": "Ближний бой"
  },
  {
    "name": "Kunkka",
    "roles": [
      "Керри",
      "Саппорт",
      "Контролер"
    ],
    "attribute": "Сила",
    "strength": 24,
    "agility": 14,
    "intelligence": 18,
    "attackType": "Ближний бой"
  },
  {
    "name": "Dazzle",
    "roles": [
      "Саппорт",
      "Нукер"
    ],
    "attribute": "Интеллект",
    "strength": 18,
    "agility": 20,
    "intelligence": 25,
    "attackType": "Дальний бой"
  },
  {
    "name": "Witch Doctor",
    "roles": [
      "Саппорт",
      "Нукер",
      "Контролер"
    ],
    "attribute": "Интеллект",
    "strength": 18,
    "agility": 13,
    "intelligence": 22,
    "attackType": "Дальний бой"
  },
  {
    "name": "Lich",
    "roles": [
      "Саппорт",
      "Нукер"
    ],
    "attribute": "Интеллект",
    "strength": 20,
    "agility": 15,
    "intelligence": 24,
    "attackType": "Дальний бой"
  },
  {
    "name": "Ancient Apparition",
    "roles": [
      "Саппорт",
      "Контролер",
      "Нукер"
    ],
    "attribute": "Интеллект",
    "strength": 20,
    "agility": 15,
    "intelligence": 25,
    "attackType": "Дальний бой"
  },
  {
    "name": "Shadow Shaman",
    "roles": [
      "Саппорт",
      "Контролер",
      "Пушер"
    ],
    "attribute": "Интеллект",
    "strength": 23,
    "agility": 16,
    "intelligence": 25,
    "attackType": "Дальний бой"
  },
  {
    "name": "Ogre Magi",
    "roles": [
      "Саппорт",
      "Танк",
      "Нукер"
    ],
    "attribute": "Интеллект",
    "strength": 23,
    "agility": 14,
    "intelligence": 15,
    "attackType": "Ближний бой"
  },
  {
    "name": "Rubick",
    "roles": [
      "Саппорт",
      "Контролер"
    ],
    "attribute": "Интеллект",
    "strength": 21,
    "agility": 23,
    "intelligence": 28,
    "attackType": "Дальний бой"
  },
  {
    "name": "Disruptor",
    "roles": [
      "Саппорт",
      "Контролер",
      "Нукер"
    ],
    "attribute": "Интеллект",
    "strength": 21,
    "agility": 15,
    "intelligence": 20,
    "attackType": "Дальний бой"
  },
  {
    "name": "Jakiro",
    "roles": [
      "Саппорт",
      "Нукер",
      "Пушер"
    ],
    "attribute": "Интеллект",
    "strength": 25,
    "agility": 10,
    "intelligence": 28,
    "attackType": "Дальний бой"
  },
  {
    "name": "Silencer",
    "roles": [
      "Керри",
      "Саппорт",
      "Контролер"
    ],
    "attribute": "Интеллект",
    "strength": 19,
    "agility": 22,
    "intelligence": 25,
    "attackType": "Дальний бой"
  },
  {
    "name": "Necrophos",
    "roles": [
      "Керри",
      "Нукер",
      "Танк"
    ],
    "attribute": "Интеллект",
    "strength": 18,
    "agility": 12,
    "intelligence": 21,
    "attackType": "Дальний бой"
  },
  {
    "name": "Death Prophet",
    "roles": [
      "Керри",
      "Нукер",
      "Пушер"
    ],
    "attribute": "Интеллект",
    "strength": 21,
    "agility": 14,
    "intelligence": 24,
    "attackType": "Дальний бой"
  }
]

const roleOptions = ['Керри', 'Саппорт', 'Инициатор', 'Контролер', 'Нукер', 'Танк', 'Побег', 'Лесник', 'Пушер']
const attributeOptions: Attribute[] = ['Сила', 'Ловкость', 'Интеллект']
const attackOptions: AttackType[] = ['Ближний бой', 'Дальний бой']

const mosaic = [
  { name: 'Anti-Mage', image: antiImg },
  { name: 'Crystal Maiden', image: cmImg },
  { name: 'Legion Commander', image: legionImg },
  { name: 'Earthshaker', image: shakerImg },
  { name: 'Lion', image: lionImg },
]

const topCards = heroes.filter(hero => ['Anti-Mage', 'Legion Commander', 'Lion'].includes(hero.name))
const bottomCards = heroes.filter(hero => ['Crystal Maiden', 'Earthshaker', 'Faceless Void'].includes(hero.name))

function getHeroImage(hero: Hero) {
  return hero.imageKey ? heroImages[hero.imageKey] : dotaLogoImg
}

function Navbar({
  page,
  onPageChange,
  searchQuery,
  onSearchChange,
}: {
  page: Page
  onPageChange: (page: Page) => void
  searchQuery: string
  onSearchChange: (value: string) => void
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: '#ffffff' }}>
      <Toolbar sx={{ gap: 1.5, flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1b2a41', mr: 1 }}>
          Dota 2 Heroes
        </Typography>

        <Button
          color="inherit"
          variant={page === 'home' ? 'contained' : 'text'}
          onClick={() => onPageChange('home')}
          sx={{ fontWeight: 600 }}
        >
          Главная
        </Button>

        <Button
          color="inherit"
          variant={page === 'catalog' ? 'contained' : 'text'}
          onClick={() => onPageChange('catalog')}
          sx={{ fontWeight: 600 }}
        >
          Таблица
        </Button>

        <Button
          color="inherit"
          onClick={event => setAnchorEl(event.currentTarget)}
          endIcon={<KeyboardArrowDown />}
          sx={{ fontWeight: 600 }}
        >
          Другие страницы
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => { onPageChange('details'); setAnchorEl(null) }}>
            Подробнее о Legion Commander
          </MenuItem>
          <MenuItem onClick={() => { onPageChange('catalog'); setAnchorEl(null) }}>
            Каталог героев
          </MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1 }} />

        <TextField
          size="small"
          placeholder="Поиск по сайту"
          value={searchQuery}
          onChange={event => onSearchChange(event.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: { xs: '100%', sm: 260 } }}
        />
      </Toolbar>
    </AppBar>
  )
}

function ImageMosaic() {
  return (
    <Container sx={{ py: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 1.5,
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            gridTemplateRows: { xs: 'repeat(2, 180px)', md: 'repeat(2, 210px)' },
          }}
        >
          {mosaic.slice(0, 2).map(item => (
            <Box
              key={item.name}
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 3,
                display: 'block',
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            gridTemplateRows: { xs: 'repeat(3, 150px)', md: '130px 270px 130px' },
          }}
        >
          {mosaic.slice(2).map(item => (
            <Box
              key={item.name}
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 3,
                display: 'block',
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  )
}

function HeroCards({ title, items }: { title: string; items: Hero[] }) {
  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
        {items.map(hero => (
          <Card key={hero.name} sx={{ height: '100%', borderRadius: 3 }}>
            <CardMedia component="img" image={getHeroImage(hero)} alt={hero.name} sx={{ height: 150, objectFit: 'cover' }} />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>{hero.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {hero.roles.join(', ')}. {hero.attribute}.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {hero.short ?? 'Герой из каталога Dota 2 с набором командных ролей.'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  )
}

function CentralBlock() {
  return (
    <Container sx={{ py: 3 }}>
      <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, bgcolor: '#e9edf5' }}>
        <Box component="img" src={dotaLogoImg} alt="Dota 2 Logo"
          sx={{ width: '100%', height: { xs: 140, md: 190 }, objectFit: 'cover', borderRadius: 3, mb: 2 }}
        />
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 800, mb: 2 }}>
          Почему Dota 2?
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 900, mx: 'auto', lineHeight: 1.7 }}>
          Dota 2 — это глубокая стратегическая MOBA, где каждый герой уникален, а победа зависит
          от командной игры, позиционирования и понимания механик. Здесь нет двух одинаковых матчей:
          составы героев, роли и решения игроков каждый раз создают новую ситуацию.
        </Typography>
        <Button
          component="a"
          href="https://www.dota2.com"
          target="_blank"
          rel="noreferrer"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Подробнее
        </Button>
      </Paper>
    </Container>
  )
}

function HomePage({ searchQuery }: { searchQuery: string }) {
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const foundHeroes = heroes.filter(hero => hero.name.toLowerCase().includes(normalizedQuery))
  const visibleTopCards = normalizedQuery ? foundHeroes.slice(0, 3) : topCards

  return (
    <>
      <ImageMosaic />
      <HeroCards title={normalizedQuery ? 'Результаты поиска' : 'Популярные герои'} items={visibleTopCards} />
      <CentralBlock />
      <HeroCards title="Дополнительные герои" items={bottomCards} />
    </>
  )
}

function CatalogPage({ searchQuery }: { searchQuery: string }) {
  const [role, setRole] = useState('all')
  const [attribute, setAttribute] = useState('all')
  const [attackType, setAttackType] = useState('all')

  const filteredHeroes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return heroes.filter(hero => {
      const matchesSearch = hero.name.toLowerCase().includes(query) || hero.roles.join(' ').toLowerCase().includes(query)
      const matchesRole = role === 'all' || hero.roles.includes(role)
      const matchesAttribute = attribute === 'all' || hero.attribute === attribute
      const matchesAttack = attackType === 'all' || hero.attackType === attackType

      return matchesSearch && matchesRole && matchesAttribute && matchesAttack
    })
  }, [searchQuery, role, attribute, attackType])

  const resetFilters = () => {
    setRole('all')
    setAttribute('all')
    setAttackType('all')
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        Каталог героев Dota 2
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Данные из исходной HTML-таблицы перенесены в типизированный массив TypeScript.
      </Typography>

      <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Роль</InputLabel>
            <Select value={role} label="Роль" onChange={(event: SelectChangeEvent) => setRole(event.target.value)}>
              <MenuItem value="all">Все</MenuItem>
              {roleOptions.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Атрибут</InputLabel>
            <Select value={attribute} label="Атрибут" onChange={(event: SelectChangeEvent) => setAttribute(event.target.value)}>
              <MenuItem value="all">Все</MenuItem>
              {attributeOptions.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Тип боя</InputLabel>
            <Select value={attackType} label="Тип боя" onChange={(event: SelectChangeEvent) => setAttackType(event.target.value)}>
              <MenuItem value="all">Все</MenuItem>
              {attackOptions.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={resetFilters} sx={{ minWidth: 130 }}>
            Сбросить
          </Button>
        </Stack>
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 800, bgcolor: '#eef2f8' } }}>
              <TableCell>Имя героя</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Атрибут</TableCell>
              <TableCell>Тип боя</TableCell>
              <TableCell align="right">Сила</TableCell>
              <TableCell align="right">Ловкость</TableCell>
              <TableCell align="right">Интеллект</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHeroes.map(hero => (
              <TableRow key={hero.name} hover>
                <TableCell sx={{ fontWeight: 700 }}>{hero.name}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    {hero.roles.map(item => <Chip key={item} label={item} size="small" />)}
                  </Stack>
                </TableCell>
                <TableCell>{hero.attribute}</TableCell>
                <TableCell>{hero.attackType}</TableCell>
                <TableCell align="right">{hero.strength}</TableCell>
                <TableCell align="right">{hero.agility}</TableCell>
                <TableCell align="right">{hero.intelligence}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

function DetailsPage() {
  const legion = heroes.find(hero => hero.name === 'Legion Commander')!

  return (
    <Container sx={{ py: 4 }}>
      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <CardMedia component="img" image={legionImg} alt="Legion Commander" sx={{ height: { xs: 260, md: 420 }, objectFit: 'cover' }} />
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            {legion.name}
          </Typography>
          <Typography sx={{ lineHeight: 1.8, mb: 2 }}>
            Legion Commander — бесстрашный командир, рожденный для битвы. Её философия проста:
            сила и победа доказываются только в честном поединке лицом к лицу. Герой хорошо подходит
            для роли инициатора и керри, потому что может быстро начинать сражение и усиливаться после
            выигранных дуэлей.
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 2 }}>
            {legion.roles.map(item => <Chip key={item} label={item} color="primary" />)}
            <Chip label={legion.attribute} color="secondary" />
            <Chip label={legion.attackType} />
          </Stack>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography color="text.secondary">Сила</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>{legion.strength}</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography color="text.secondary">Ловкость</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>{legion.agility}</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography color="text.secondary">Интеллект</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>{legion.intelligence}</Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

function Footer() {
  return (
    <Box component="footer" sx={{ textAlign: 'center', py: 2.5, mt: 4, borderTop: '1px solid #d9dee8', bgcolor: '#fff' }}>
      <Typography variant="body2" color="text.secondary">
        © 2025 | МОАиС | Капитонов Илья
      </Typography>
    </Box>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <Box id="top" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar page={page} onPageChange={setPage} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {page === 'home' && <HomePage searchQuery={searchQuery} />}
        {page === 'catalog' && <CatalogPage searchQuery={searchQuery} />}
        {page === 'details' && <DetailsPage />}
      </Box>
      <Footer />
    </Box>
  )
}
