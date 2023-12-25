// NPM Modules
import bCrypt from 'bcryptjs';
import knex from 'knex';

// Local Modules
import knexConfigs from '../knex.configs';
import config from '../src/config/variables.config';

const { SUPERADMIN_PASSWORD, URLS } = config;
const { PICTURE_URL } = URLS;

const pg = knex(knexConfigs.development);

async function seed(pg) {
  // Inserts seed entries
  await pg.transaction(async (trx) => {
    await trx('users').insert([
      {
        adminname: 'superadmin',
        avc: '2132326262626',
        bank_account: 'bank_account',
        password: bCrypt.hashSync(
          SUPERADMIN_PASSWORD,
          bCrypt.genSaltSync(10),
          null
        ),
        email: 'superadmin@gmail.com',
        phone: '+37499151515',
        logo: `${PICTURE_URL}/c9cd9e51-f0ba-45d4-b09c-9878b742b2b6.jpg`,
        info: 'About',
        company_name: 'supercompany',
        role: 'superadmin',
        payment_method: [
          {
            name: 'telcell',
            status: true
          },
          {
            name: 'idram',
            status: true
          },
          {
            name: 'arca',
            status: true
          }
        ],
        created_at: new Date().toISOString()
      },
    //   {
    //     adminname: 'user1',
    //     avc: '2132326262626',
    //     bank_account: 'bank_account',
    //     users_id: 2,
    //     branch_address: ['Masiv', 'Kentron'],
    //     password: bCrypt.hashSync(
    //       SUPERADMIN_PASSWORD,
    //       bCrypt.genSaltSync(10),
    //       null
    //     ),
    //     email: 'user1@gmail.com',
    //     phone: '+37499161515',
    //     logo: `${PICTURE_URL}/c9cd9e51-f0ba-45d4-b09c-9878b742b2b6.jpg`,
    //     info: 'About',
    //     company_name: 'user1company',
    //     role: 'admin',
    //     payment_method: [
    //       {
    //         name: 'telcell',
    //         status: true
    //       },
    //       {
    //         name: 'idram',
    //         status: true
    //       },
    //       {
    //         name: 'arca',
    //         status: true
    //       }
    //     ],
    //     created_at: new Date().toISOString()
    //   },
    //   {
    //     adminname: 'user2',
    //     avc: '2132326262626',
    //     bank_account: 'bank_account',
    //     users_id: 3,
    //     password: bCrypt.hashSync(
    //       SUPERADMIN_PASSWORD,
    //       bCrypt.genSaltSync(10),
    //       null
    //     ),
    //     email: 'user2@gmail.com',
    //     phone: '+37499161515',
    //     logo: `${PICTURE_URL}/c9cd9e51-f0ba-45d4-b09c-9878b742b2b6.jpg`,
    //     info: 'About',
    //     company_name: 'Brabion',
    //     role: 'admin',
    //     payment_method: [
    //       {
    //         name: 'telcell',
    //         status: true
    //       },
    //       {
    //         name: 'idram',
    //         status: true
    //       },
    //       {
    //         name: 'arca',
    //         status: true
    //       }
    //     ],
    //     created_at: new Date().toISOString()
    //   }
    ]);
    await trx.commit();
  });

  await pg('slides').insert([
    {
      src: `${PICTURE_URL}/slide1.jpg`,
      alt: 'slide1',
      link: '',
      text: '',
      created_at: new Date().toISOString()
    },
    {
      src: `${PICTURE_URL}/slide2.jpg`,
      alt: 'slide2',
      link: '',
      text: '',
      created_at: new Date().toISOString()
    },
    {
      src: `${PICTURE_URL}/slide3.jpg`,
      alt: 'slide3',
      link: '',
      text: '',
      created_at: new Date().toISOString()
    },
    {
      src: `${PICTURE_URL}/slide4.jpg`,
      alt: 'slide4',
      link: '',
      text: '',
      created_at: new Date().toISOString()
    },
    {
      src: `${PICTURE_URL}/slide5.jpg`,
      alt: 'slide5',
      link: '',
      text: '',
      created_at: new Date().toISOString()
    }
  ]);

  await pg('footers').insert([
    {
      name: 'ԿԱԶՄԱԿԵՐՊՈՒԹՅՈՒՆ',
      links: [
        {
          link: '#',
          linkName: 'Մեր մասին'
        },
        {
          link: 'https://tailwindcss.com/',
          linkName: 'Նորություններ'
        },
        {
          link: 'https://tailwindcss.com/',
          linkName: ' Հետադարձ կապ'
        },
        {
          link: 'https://github.com/themesberg/flowbite',
          linkName: 'Ընդհանուր դրույթներ և պայմաններ'
        }
      ]
    },
    {
      name: 'Գործընկերներ',
      links: [
        {
          link: '#',
          linkName: 'Դարձիր առաքիչ֊գործընկեր'
        },
        {
          link: '#',
          linkName: 'Ինչպես պատվիրել'
        }
      ]
    },
    {
      icond: '',
      title: null,
      name: '© 2023. Բոլոր իրավունքները Պաշտպանված են',
      link: null
    },
    {
      icond:
        'M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z',
      title: 'Facebook',
      name: 'Facebook page',
      link: '#'
    },
    {
      icond:
        'M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z',
      title: 'Discord',
      name: 'Discord community ',
      link: '#'
    },
    {
      icond:
        'M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z',
      title: 'Twitter',
      name: 'Twitter page',
      link: '#'
    },
    {
      icond:
        'M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z',
      title: 'GitHub',
      name: 'GitHub account',
      link: '#'
    },
    {
      icond:
        'M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z',
      title: 'Dribbble',
      name: 'Dribbble account',
      link: '#'
    }
  ]);
  await pg('about').insert([
    {
      name: 'Kayqy naxtesvats e cankacats tsaxiki xanuti hamar vorpes xanut grancvelu hamar xndrum em dimeq mez 099999999 ',
      position: 'About Us',
      logo: null,
      text: 'Mer Tim@',
      title: 'Mer Patmutyun@',
      created_at: new Date().toISOString()
    },
    {
      name: 'Sergey Abrhamyan',
      position: 'himnadir tnoren',
      logo: 'https://via.placeholder.com/150',
      text: null,
      title: null,
      created_at: new Date().toISOString()
    },
    {
      name: 'Xachik Araqelyan',
      position: 'mard',
      logo: 'https://via.placeholder.com/150',
      text: null,
      title: null,
      created_at: new Date().toISOString()
    },
    {
      name: 'Jan Ghumashyan',
      position: 'mard',
      logo: 'https://via.placeholder.com/150',
      text: null,
      title: null,
      created_at: new Date().toISOString()
    },
    {
      name: 'Armen Knyazyan',
      position: 'mard',
      logo: 'https://via.placeholder.com/150',
      text: null,
      title: null,
      created_at: new Date().toISOString()
    },
    {
      name: 'Hovhannes Araqelyan',
      position: 'mard',
      logo: 'https://via.placeholder.com/150',
      text: null,
      title: null,
      created_at: new Date().toISOString()
    },
    {
      name: 'Marat Hakobyan',
      position: 'e class',
      logo: 'https://via.placeholder.com/150',
      text: null,
      title: null,
      created_at: new Date().toISOString()
    },
    {
      name: 'Shaliko Arshakyan',
      position: 'c klass',
      logo: 'https://via.placeholder.com/150',
      text: null,
      title: null,
      created_at: new Date().toISOString()
    },
    {
      name: 'Hovhannes Asatryam',
      position: 'ML Mining',
      logo: 'https://via.placeholder.com/150',
      text: null,
      title: null,
      created_at: new Date().toISOString()
    },
    {
      name: 'Artur Xachatryan',
      position: 'Iphone',
      logo: 'https://via.placeholder.com/150',
      text: null,
      title: null,
      created_at: new Date().toISOString()
    }
  ]);
  await pg('contact').insert([
    {
      title: 'Մեր հասցեն',
      text: 'Միկոյան 15',
      link: 'https://www.google.com/maps/place/15+%D5%84%D5%AB%D5%AF%D5%B8%D5%B5%D5%A1%D5%B6+%D6%83%D5%B8%D5%B2%D5%B8%D6%81,+%D4%B5%D6%80%D6%87%D5%A1%D5%B6+0090/@40.1830199,44.5650941,17z/data=!4m15!1m8!3m7!1s0x406abcb20cc55c6f:0x2e7beb956a52c346!2zMTUg1YTVq9Wv1bjVtdWh1bYg1oPVuNWy1bjWgSwg1LXWgNaH1aHVtiAwMDkw!3b1!8m2!3d40.1830158!4d44.567669!16s%2Fg%2F11cphqv8x8!3m5!1s0x406abcb20cc55c6f:0x2e7beb956a52c346!8m2!3d40.1830158!4d44.567669!16s%2Fg%2F11cphqv8x8?entry=ttu',
      created_at: new Date().toISOString()
    },
    {
      title: 'Հեռախոս',
      text: '099999999',
      link: '099999999',
      created_at: new Date().toISOString()
    },
    {
      title: 'Էլ. Հասցե',
      text: 'Xcho@gmail.com',
      link: null,
      created_at: new Date().toISOString()
    }
  ]);
  // await pg('product_statuses').insert([
  //   { name: 'bouquets' },
  //   { name: 'wreaths' },
  //   { name: 'gifts' }
  // ]);
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await seed(pg);
    console.log('Successfully inserted all data ... ');
    process.kill(process.pid);
  } catch (error) {
    console.error(error.message);
  }
}

init();
