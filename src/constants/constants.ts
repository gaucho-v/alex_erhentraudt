import {QuizList} from "../models/models";

const now = new Date();

export const QUIZ_LIST: Partial<QuizList> = [{
    id: 1,
    question: {
        id: 1,
        title: 'Какое сегодня число?',
        label: 'Вопрос'
    },
    answer: {
        id: 1,
        options: [
            { label: '32' },
            { label: '36' },
            { label: '1996' },
            { label: now.getDate().toString(), isCorrect: true },
        ]
    }
}, {
    id: 2,
    question: {
        id: 2,
        title: 'Как называют ритуальный танец, который проводится вокруг ели?',
        label: 'Вопрос'
    },
    answer: {
        id: 2,
        options: [
            { label: 'Хоровод', isCorrect: true },
            { label: 'Марсоход' },
            { label: 'Лимбо' },
            { label: 'Ламбада' }
        ]
    }
}, {
    id: 3,
    question: {
        id: 3,
        title: 'В какой новогодней песне встречаются такие строчки: Let it snow! Let it snow! Let it snow!',
        label: 'Музыкальный вопрос'
    },
    answer: {
        id: 3,
        options: [
            { label: 'Дора – Кьют-рок' },
            { label: 'unknow - た鼻立ちの日に' },
            { label: 'Dean Martin – Let It Snow!', isCorrect: true },
            { label: 'Arabian cat - ft.Panjabi MC' },
        ]
    }
}, {
    id: 4,
    question: {
        id: 4,
        imageClassName: 'Question_Image_Bird',
        label: 'Птичий вопрос'
    },
    answer: {
        id: 4,
        options: [
            { label: 'Сомнительно' },
            { label: 'Вряд-ли', isCorrect: true },
            { label: 'Время покажет' },
            { label: 'Скорее нет' },
        ]
    }
}, {
    id: 5,
    question: {
        id: 5,
        title: 'Выберите своего бойца',
        label: 'Проходной вопрос',
    },
    answer: {
        id: 5,
        options: [
            { label: 'Крамбл куки Захар' },
            { label: 'Крамбл куки жена Захара' },
            { label: 'Ма Дон-сок', isCorrect: true },
            { label: 'Ведущий инженер-электронщик 2 категории', isCorrect: true },
        ]
    }
}, {
    id: 6,
    question: {
        id: 6,
        title: 'Что он делал на стриме пару лет назад?',
        imageClassName: 'Question_Image_Amnuam',
        label: 'Фото вопрос'
    },
    answer: {
        id: 6,
        options: [
            { label: 'Ебался.', isCorrect: true },
            { label: 'Мешал смотреть' },
            { label: 'Не ебался' },
            { label: 'Вел прямую трансляцию' },
        ]
    }
}, {
    id: 7,
    question: {
        id: 7,
        label: 'Темное задание'
    },
    answer: {
        id: 7,
        options: [
            { label: 'Flower Boy' },
            { label: 'Wolf' },
            { label: 'Call Me If You Get Lost' },
            { label: 'Igor', isCorrect: true },
        ]
    }
}, {
    id: 8,
    question: {
        id: 8,
        label: 'Хани и пай (еще немножко бредика)',
        link: 'https://www.youtube.com/embed/mcYLzu_1cNc?si=ReX5TSVenVJop_Kv',
    },
    answer: {
        id: 8,
        options: [
            { label: 'Ooh', isCorrect: true },
            { label: 'Girl', isCorrect: true },
            { label: "Don't you", isCorrect: true },
            { label: 'Stop', isCorrect: true },
        ]
    }
}, {
    id: 9,
    question: {
        id: 9,
        label: 'Задание на посмотреть',
        title: 'Сколько в клипе красных шортиков?',
        link: "https://www.youtube.com/embed/dwGO-wwKSjg?si=va9JNLxY8d8AqC1j",
    },
    answer: {
        id: 9,
        options: [
            { label: 'Вижу красный и все классно' },
            { label: '3', isCorrect: true },
            { label: "2" },
            { label: '4' },
        ]
    }
}, {
    id: 10,
    question: {
        id: 10,
        label: 'Вопрос для фанатов жопных дырок, фаллических символов и прикосновений',
        title: 'Какой никнейм этот персонаж поставил бы себе в онлайн игре?',
        imageClassName: "Question_Image_Bondrewd",
    },
    answer: {
        id: 10,
        options: [
            { label: "❤️ProoshkaTyan❤️", isCorrect: true },
            { label: 'bardugunN1_1999' },
            { label: "Сartridge_Lover" },
            { label: 'Bonduelle' },
        ]
    }
}, {
    id: 11,
    question: {
        id: 11,
        label: 'Хороший вопрос',
        link: 'https://www.youtube.com/embed/siBDVuBPij4',
        title: 'Какое насекомое знает эту песню?',
    },
    answer: {
        id: 11,
        options: [
            { label: 'Коричневый мраморный щитник' },
            { label: "Пчела" },
            { label: "Комар", isCorrect: true },
            { label: 'Пикмуха' },
        ]
    }
}, {
    id: 12,
    question: {
        id: 12,
        label: 'Бытовой вопрос',
        title: 'Где будешь стирать вещи?',
    },
    answer: {
        id: 12,
        options: [
            { label: '', image: 'https://img.promportal.su/foto/good_fotos/53864/538645294/tazik-plastikoviy_foto_largest.jpg', isCorrect: true },
            { label: '', image: 'https://mebel-v-vannu.ru/image/cache/data/Santek/Santek_boriel_60_1-1280x1280.jpg' },
            { label: '', image: 'https://ir.ozone.ru/s3/multimedia-1-b/c1000/7089443903.jpg' },
            { label: '', image: 'https://basket-30.wbbasket.ru/vol5839/part583957/583957902/images/c516x688/1.webp' },
        ]
    }
}, {
    id: 13,
    question: {
        id: 13,
        label: 'Бытовой вопрос',
        title: 'Где будешь хранить продукты?',
    },
    answer: {
        id: 12,
        options: [
            { label: '', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktwbIzv3M36wWosmq5k0up9PwNgGGws9zuA&s' },
            { label: '', image: 'https://nashaotdelka.ru/wp-content/uploads/fmg5dc47f3c4155d5.jpg', isCorrect: true },
            { label: '', image: 'https://exporenta.ru/upload/iblock/4b8/4b8ccb0deac1eb3edcd2b56d56f94440.jpg' },
            { label: '', image: 'https://holodtrades.ru/image/cache/catalog/Shkafy%20holodilnye/Bitovie/Haier%20MSR115/32637e67_4cff_11ec_940d_9440c9efd392_32637e69_4cff_11ec_940d_9440c9efd392-1000x1000.jpeg' },
        ]
    }
}, {
    id: 14,
    question: {
        id: 14,
        label: 'Дорохе + дора',
        title: 'Как зовут героиню слева?',
        imageClassName: "Question_Image_Dorohedoro",
    },
    answer: {
        id: 14,
        options: [
            { label: 'Никайдо', isCorrect: true },
            { label: 'Ной', },
            { label: 'Эбису', },
            { label: 'Рёзе', },
        ]
    }
}, {
    id: 15,
    question: {
        id: 15,
        label: 'Выбираем анимешку',
        title: 'Что смотрим в 2026?',
    },
    answer: {
        id: 15,
        options: [
            { label: 'Фури Кури', },
            { label: 'FLCL', },
            { label: 'Пираты «Чёрной лагуны»', isCorrect: true },
            { label: 'Furi Kuri', },
        ]
    }
}, {
    id: 16,
    question: {
        id: 16,
        label: 'Кочка вопрос',
        title: 'В какой день лучше не делать Болгарские выпады?',
    },
    answer: {
        id: 16,
        options: [
            { label: 'В любой день, у меня лапки', isCorrect: true },
            { label: 'Вторник', },
            { label: 'Четверг' },
            { label: 'Суббота', },
        ]
    }
}, {
    id: 17,
    question: {
        id: 17,
        label: 'Идеальный ивнинг',
        title: 'Что купить на вечер?',
    },
    answer: {
        id: 17,
        options: [
            { label: 'Пиво и сырок', isCorrect: true },
            { label: 'Вино и орешки', isCorrect: true },
            { label: 'Стекломой с семечками', isCorrect: true },
            { label: 'На свое усмотрение, маленький', isCorrect: true },
        ]
    }
}, {
    id: 18,
    question: {
        id: 18,
        label: 'Математика',
        title: 'У Феди было 7 яблок, 2 яблока он съел, а остальные оставил на кухне. Сколько пива он возьмет на вечер?',
    },
    answer: {
        id: 18,
        options: [
            { label: 'Да все у меня паничка от кол-ва яблок' },
            { label: 'Извини, что?' },
            { label: 'Упоротый', isCorrect: true },
            { label: 'Подъезжаю на нижний вход' },
        ]
    }
}]