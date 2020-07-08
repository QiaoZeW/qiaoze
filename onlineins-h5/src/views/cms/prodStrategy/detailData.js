const productUrl = {
	'1': '/product/Detail.html?product_id=1', // 康惠保旗舰版
	'2': '/product/Detail.html?product_id=2', // 童慧宝
	'3': '/product/Detail.html?product_id=3', // 定惠保
	'113': '/product/Detail.html?product_id=113', // 加惠宝
	'114': '/product/Detail.html?product_id=114', // 康惠保尊享版
	'124': '/product/Detail.html?product_id=124', // 医无忧
	'123': '/product/Detail.html?product_id=123', // 医惠通
  '125': '/product/Detail.html?product_id=125' // 康惠保超越版

}

export default {
    '01': {
	    title: '同样是重疾险。康惠保旗舰版、康惠保 尊享版、康惠保超越版、 加惠保有什么区别？',
      showTitle: '对比',
      productDescription:'百年人寿4款重疾险，快来了解一下！（机智）',
      imgData: [
        require('@/assets/imgs/prodStrategy/detail01/1.png'),
        require('@/assets/imgs/prodStrategy/detail01/2.png'),
        require('@/assets/imgs/prodStrategy/detail01/3.png'),
        require('@/assets/imgs/prodStrategy/detail01/4.png'),
        require('@/assets/imgs/prodStrategy/detail01/5.png'),
        require('@/assets/imgs/prodStrategy/detail01/6.png'),
      ],
      linkData: [
      	{
      		text: '传送门：康惠保旗舰版 >>>',
      		href: productUrl['1']
      	},
      	{
      		text: '康惠保尊享版 >>>',
      		href: productUrl['114']
      	},
      	{
      		text: '康惠保超越版 >>>',
      		href: productUrl['125']
      	},
      	{
      		text: '加惠保 >>>',
      		href: productUrl['113']
      	}
      ],
      nextData: {
        text: '下一篇：同样是百万医疗。医惠通和医无忧有什么区别？',
        href: '/cms/prodStrategy/StrategyDetail.html?detailId=02'
      }
    },
    '02': {
      title: '同样是百万医疗。医惠通和医无忧有什么区别？',
      showTitle: '对比',
      productDescription:'百年人寿2款医疗险，快来了解一下！（机智）',
      imgData: [
        require('@/assets/imgs/prodStrategy/detail02/1.png'),
        require('@/assets/imgs/prodStrategy/detail02/2.png'),
        require('@/assets/imgs/prodStrategy/detail02/3.png'),
        require('@/assets/imgs/prodStrategy/detail02/4.png')
      ],
      nextData: {
        text: '下一篇：医疗险和重疾险有什么区别？',
        href: '/cms/prodStrategy/StrategyDetail.html?detailId=07'
      },
      linkData: [
      	{
      		text: '传送门：医惠通>>>',
      		href: productUrl['123']
      	},
      	{
      		text: '医无忧>>>',
      		href: productUrl['124']
      	}
      ]
    },
    '07': {
      title: '医疗险和重疾险有什么区别？',
      showTitle: '对比',
      productDescription:'百年人寿2款医疗险，快来了解一下！（机智）',
      imgData: [
        require('@/assets/imgs/prodStrategy/detail07/1.jpg'),
        require('@/assets/imgs/prodStrategy/detail07/2.jpg')
      ],
      nextData: {
        text: '下一篇：重疾险，什么时候买更适合？',
        href: '/cms/prodStrategy/StrategyDetail.html?detailId=03'
      },
      linkData: [
        {
          text: '',
          href: ''
        }
      ]
    },
    '03': {
      title: '重疾险，什么时候买更适合？',
      showTitle: '小课堂',
      productDescription:'实用小技巧，快来了解一下。',
      imgData: [
        require('@/assets/imgs/prodStrategy/detail03/1.png'),
        require('@/assets/imgs/prodStrategy/detail03/2.png'),
        require('@/assets/imgs/prodStrategy/detail03/3.png'),
        require('@/assets/imgs/prodStrategy/detail03/4.png')
      ],
      nextData: {
        text: '下一篇：【单身篇】如何科学规划保障？',
        href: '/cms/prodStrategy/StrategyDetail.html?detailId=04'
      },
      linkData: [
      	{
      		text: '',
      		href: ''
      	}
      ]
    },
    '04': {
       title: '【单身篇】如何科学规划保障',
       showTitle: '方案',
       productDescription:'享受当下的潇洒，免去未来的后顾之忧。',
       imgData: [
         require('@/assets/imgs/prodStrategy/detail04/1.png'),
         require('@/assets/imgs/prodStrategy/detail04/2.png'),
         require('@/assets/imgs/prodStrategy/detail04/3.png')
       ],
      nextData: {
        text: '下一篇：【家庭篇】如何科学规划保障？',
        href: '/cms/prodStrategy/StrategyDetail.html?detailId=05'
      },
      linkData: [
      	{
      		text: '传送门：康惠保旗舰版 >>>',
      		href: productUrl['1']
      	}
      ]
    },
    '05': {
      title: '【家庭篇】如何科学规划保障？',
      showTitle: '方案',
      productDescription:'家庭除了油盐酱醋的琐碎，还有未来科学务实的规划。',
      imgData: [
        require('@/assets/imgs/prodStrategy/detail05/1.png'),
        require('@/assets/imgs/prodStrategy/detail05/2.png'),
        require('@/assets/imgs/prodStrategy/detail05/3.png'),
        require('@/assets/imgs/prodStrategy/detail05/4.png')
      ],
      nextData: {
        text: '下一篇：【儿童篇】如何科学规划保障？',
        href: '/cms/prodStrategy/StrategyDetail.html?detailId=06'
      },
      linkData: [
      	{
      		text: '传送门：康惠保旗舰版 >>>',
      		href: productUrl['1']
      	}
      ]
    },
    '06': {
      title: '【儿童篇】如何科学规划保障？',
      showTitle: '方案',
      productDescription:'为家长解决后顾之忧。',
      imgData: [
        require('@/assets/imgs/prodStrategy/detail06/1.jpg'),
        require('@/assets/imgs/prodStrategy/detail06/2.jpg')
      ],
      nextData: {
        text: '下一篇：同样是重疾险。康惠保旗舰版、康惠保 尊享版、康惠保超越版、 加惠保有什么区别？',
        href: '/cms/prodStrategy/StrategyDetail.html?detailId=01'
      },
      linkData: [
        {
          text: '传送门：康惠保旗舰版 >>>',
          href: productUrl['1']
        }
      ]
    }
  }

export const detail04LinkDatas = {
	'1': [
	  	{
	  		text: '传送门：康惠保旗舰版 >>>',
	  		href: productUrl['1']
	  	},
	  	{
	  		text: '康惠保超越版 >>>',
	  		href: productUrl['125']
	  	},
      {
        text: '医惠通 >>>',
        href: productUrl['123']
      }
	 ],
	 '2': [
    	{
    		text: '传送门：康惠保尊享版 >>>',
    		href: productUrl['114']
    	},
    	{
        text: '医惠通 >>>',
        href: productUrl['123']
      }
    ],
   '3': [
        {
          text: '传送门：康惠保尊享版 >>>',
          href: productUrl['114']
        },
        {
          text: '加惠保 >>>',
          href: productUrl['113']
        },
        {
          text: '医无忧 >>>',
          href: productUrl['124']
        }
      ]
}

export const detail05LinkDatas = {
  '1': [
      {
        text: '寿险推荐：定惠保旗舰版 >>>',
        href: productUrl['3']
      }
   ],
   '2': [
      {
        text: '重疾险推荐：康惠保旗舰版 >>>',
        href: productUrl['1']
      },
      {
        text: '康惠保尊享版 >>>',
        href: productUrl['114']
      },
      {
        text: '康惠保超越版 >>>',
        href: productUrl['125']
      },
      {
        text: '加惠保 >>>',
        href: productUrl['113']
      }
    ],
    '3': [
      {
        text: '相关阅读：同样是重疾险。康惠保旗舰版、康惠保尊享版、康惠保超越版、加惠保到底有什么不同？ >>>',
        href: '/cms/prodStrategy/StrategyDetail.html?detailId=01'
      }
   ],
   '4': [
      {
        text: '重疾险推荐：童惠保',
        href: productUrl['2']
      },
      {
        text: '康惠保旗舰版',
        href: productUrl['1']
      }
    ],
    '5': [
      {
        text: '医疗险推荐：医惠通',
        href: productUrl['123']
      }
   ]
}

export const detail06LinkDatas = {
  '1': [
      {
        text: '传送门：康惠保旗舰版 >>>',
        href: productUrl['1']
      }
   ],
   '2': [
      {
        text: '传送门：康惠保超越版 >>>',
        href: productUrl['125']
      }
    ],
   '3': [
      {
        text: '传送门：童惠保 >>>',
        href: productUrl['2']
      }
    ]
}
