var jobs={
    "label": "请选择",
    "name": "job",
    "options": [
        {
            "value": "3010101",
            "label": "行政业务办公人员（内勤）",
            "name": "block"
        },
        {
            "value": "1050103",
            "label": "企业职能部门经理或主管",
            "name": "block"
        },
        {
            "value": "2021302",
            "label": "计算机软件技术人员",
            "name": "block"
        },
        {
            "value": "2060301",
            "label": "会计人员",
            "name": "block"
        },
        {
            "value": "4010101",
            "label": "营业员",
            "name": "block"
        },
        {
            "value": "3010202",
            "label": "公务员",
            "name": "block"
        },
        {
            "value": "2099908",
            "label": "学龄前儿童",
            "name": "block"
        },
        {
            "value": "2099907",
            "label": "一般学生",
            "name": "block"
        },
        {
            "value": "8",
            "label": "其他从业人员",
            "children": {
                "name": "job0",
                "label": "请选择",
                "options": [{
                    "value": "1",
                    "label": "国家机关、党群组织、企业事业单位负责人",
                    "children": {
                        "name": "job1",
                        "label": "请选择",
                        "options": [{
                            "value": "101",
                            "label": "中国共产党中央委员会和地方各级党组织负责人",
                            "children": {
                                "name": "block1",
                                "label": "",
                                "options": [{
                                    "value": "1010001",
                                    "label": "中国共产党中央委员会和地方各级党组织负责人",
                                    "occupationType": "1",
                                    "hospitalRisk": "1"
                                }]
                            }
                        },
                            {
                                "value": "102",
                                "label": "国家机关及其工作机构负责人",
                                "children": {
                                    "name": "block1",
                                    "label": "",
                                    "options": [{
                                        "value": "1020101",
                                        "label": "国家权力机关及其工作机构负责人",
                                        "occupationType": "1",
                                        "hospitalRisk": "1"
                                    },
                                        {
                                            "value": "1020201",
                                            "label": "人民政协及其工作机构负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1020301",
                                            "label": "人民法院负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1020401",
                                            "label": "人民检察院负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1020501",
                                            "label": "国家行政机关及其工作机构负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1029901",
                                            "label": "其他国家机关及其工作机构负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        }]
                                }
                            },
                            {
                                "value": "103",
                                "label": "民主党派和社会团体及其工作机构负责人",
                                "children": {
                                    "name": "block1",
                                    "label": "",
                                    "options": [{
                                        "value": "1030101",
                                        "label": "民主党派负责人",
                                        "occupationType": "1",
                                        "hospitalRisk": "1"
                                    },
                                        {
                                            "value": "1030201",
                                            "label": "工会负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1030202",
                                            "label": "中国共产主义青年团负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1030203",
                                            "label": "妇女联合会负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1030299",
                                            "label": "其他人民团体及其工作机构负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1030301",
                                            "label": "群众自治组织负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1039901",
                                            "label": "其他社会团体及其工作机构负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        }]
                                }
                            },
                            {
                                "value": "104",
                                "label": "事业单位负责人",
                                "children": {
                                    "name": "block1",
                                    "label": "",
                                    "options": [{
                                        "value": "1040101",
                                        "label": "高等学校校长",
                                        "occupationType": "1",
                                        "hospitalRisk": "1"
                                    },
                                        {
                                            "value": "1040102",
                                            "label": "中等职业教育学校校长",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1040103",
                                            "label": "中小学校校长",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1040199",
                                            "label": "其他教育教学单位负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1040201",
                                            "label": "卫生单位负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1040301",
                                            "label": "科研单位负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1049901",
                                            "label": "其他事业单位负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        }]
                                }
                            },
                            {
                                "value": "105",
                                "label": "企业负责人",
                                "children": {
                                    "name": "block1",
                                    "label": "",
                                    "options": [{
                                        "value": "1050101",
                                        "label": "企业董事",
                                        "occupationType": "1",
                                        "hospitalRisk": "1"
                                    },
                                        {
                                            "value": "1050102",
                                            "label": "企业经理",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1050103",
                                            "label": "企业职能部门经理或主管",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1050104",
                                            "label": "工厂、企业负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "1050105",
                                            "label": "出版商、书店、文具店负责人",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        }]
                                }
                            }]
                    }
                },
                    {
                        "value": "2",
                        "label": "专业技术人员",
                        "children": {
                            "name": "job1",
                            "label": "请选择",
                            "options": [{
                                "value": "201",
                                "label": "科学研究人员",
                                "children": {
                                    "name": "block1",
                                    "label": "",
                                    "options": [{
                                        "value": "2010101",
                                        "label": "哲学研究人员",
                                        "occupationType": "1",
                                        "hospitalRisk": "1"
                                    },
                                        {
                                            "value": "2010201",
                                            "label": "经济学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2010301",
                                            "label": "法学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2010401",
                                            "label": "社会学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2010501",
                                            "label": "教育科学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2010601",
                                            "label": "文学、艺术研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2010701",
                                            "label": "图书馆学、情报学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2010801",
                                            "label": "历史学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2010901",
                                            "label": "管理科学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2011001",
                                            "label": "数学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2011101",
                                            "label": "物理学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2011201",
                                            "label": "化学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2011301",
                                            "label": "天文学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2011401",
                                            "label": "地球科学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2011501",
                                            "label": "生物科学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2011601",
                                            "label": "农业科学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2011701",
                                            "label": "医学研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "2011801",
                                            "label": "体育研究人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        }]
                                }
                            },
                                {
                                    "value": "202",
                                    "label": "工程技术人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2020203",
                                            "label": "摄影测量与遥感工程技术人员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2020204",
                                                "label": "地图制图与印刷工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020206",
                                                "label": "海洋测绘工程技术人员(非海上作业)",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020302",
                                                "label": "选矿与矿物加工工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020401",
                                                "label": "石油开采工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020402",
                                                "label": "石油储运工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020501",
                                                "label": "冶炼工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020502",
                                                "label": "轧制工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020503",
                                                "label": "焦化工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020504",
                                                "label": "金属材料工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020505",
                                                "label": "耐火材料工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020506",
                                                "label": "碳素材料工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020507",
                                                "label": "冶金热能工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020601",
                                                "label": "化工实验工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020602",
                                                "label": "化工设计工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020701",
                                                "label": "机械设计工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020702",
                                                "label": "机械制造工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020703",
                                                "label": "仪器仪表工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020704",
                                                "label": "设备工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020705",
                                                "label": "数控程控员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020801",
                                                "label": "装甲车辆工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020802",
                                                "label": "火炮枪械工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020803",
                                                "label": "弹箭工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020901",
                                                "label": "飞机设计工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020902",
                                                "label": "飞机制造工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020903",
                                                "label": "飞机发动机设计工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2020904",
                                                "label": "飞机发动机制造工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021001",
                                                "label": "航天工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021101",
                                                "label": "电子材料工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021102",
                                                "label": "电子元器件工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021103",
                                                "label": "雷达系统工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021104",
                                                "label": "广播视听设备工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021105",
                                                "label": "电子仪器与测量工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021106",
                                                "label": "工程师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021201",
                                                "label": "通信工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021301",
                                                "label": "计算机硬件技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021302",
                                                "label": "计算机软件技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021303",
                                                "label": "计算机网络技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021304",
                                                "label": "计算机系统分析技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021305",
                                                "label": "维护工程师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021306",
                                                "label": "销售工程师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021307",
                                                "label": "计算机乐谱制作师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021308",
                                                "label": "数字视频合成师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021309",
                                                "label": "计算机软件产品检验员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021401",
                                                "label": "电机与电器工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021402",
                                                "label": "电力拖动与自动控制工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021403",
                                                "label": "电线电缆与电工材料工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021404",
                                                "label": "可编程序控制系统设计师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021503",
                                                "label": "供用电工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021601",
                                                "label": "邮政工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021701",
                                                "label": "广播电视编播工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021702",
                                                "label": "广播电视传输覆盖工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021703",
                                                "label": "电影工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021801",
                                                "label": "汽车运用工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021802",
                                                "label": "船舶运用工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021804",
                                                "label": "水上交通工程技术人员(不参与水上行动)",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021806",
                                                "label": "海上救助打捞工程技术人员(救助打捞技术、装备研究、设计)",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021807",
                                                "label": "船舶检验工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021901",
                                                "label": "民用航空器维修与适航审定专业技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021902",
                                                "label": "航行航空管理及飞行程序设计工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2021904",
                                                "label": "航空运输研究人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022001",
                                                "label": "铁道运输工程研究人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022002",
                                                "label": "铁路机务工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022003",
                                                "label": "铁路车辆工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022004",
                                                "label": "铁路电务工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022101",
                                                "label": "城镇规划设计工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022102",
                                                "label": "建筑设计工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022103",
                                                "label": "土木建筑工程技术人员(到工地监督检查指导)",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022104",
                                                "label": "土木建筑工程技术人员(不到工地)",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022105",
                                                "label": "风景园林工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022106",
                                                "label": "道路与桥梁工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022107",
                                                "label": "港口与航道工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022108",
                                                "label": "机场工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022109",
                                                "label": "铁路建筑工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022110",
                                                "label": "水利水电建筑工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022111",
                                                "label": "内勤工作人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022112",
                                                "label": "承包商(土木建筑)",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022113",
                                                "label": "建筑公司负责人、业务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022114",
                                                "label": "引导参观工地服务人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022201",
                                                "label": "硅酸盐工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022202",
                                                "label": "石棉、石膏、云母等非金属矿及制品工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022203",
                                                "label": "玻璃钢、复合材料等无机非金属新材料工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022301",
                                                "label": "林业生态环境工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022302",
                                                "label": "森林培育工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022303",
                                                "label": "园林绿化工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022305",
                                                "label": "野生动物保护与繁殖利用工程技术人员（设计、研制猎枪、猎具，改进狩猎技术，研究野生动物肉、毛皮产品测定、分析、储藏技术人员）",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022311",
                                                "label": "森林资源管理与监测工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022401",
                                                "label": "水资源勘测工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022402",
                                                "label": "治河及泥沙治理工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022403",
                                                "label": "水利工程师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022501",
                                                "label": "海洋调查与监测工程技术人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022502",
                                                "label": "海洋环境预报工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022504",
                                                "label": "海洋资源开发利用和保护工程技术人员(海水淡化、潮汐能、波浪能等能源开发、海洋生态系统保护等)",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022506",
                                                "label": "海洋工程勘察设计工程技术人员(工程设计规划人员 )",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022601",
                                                "label": "水产养殖工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022602",
                                                "label": "渔业资源开发利用工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022701",
                                                "label": "纺纱工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022702",
                                                "label": "织造工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022703",
                                                "label": "染整工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022704",
                                                "label": "工程师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022801",
                                                "label": "食品营养卫生研究及食品加工、储运工艺技术开发应用人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022901",
                                                "label": "气象观测人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022902",
                                                "label": "天气预报人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022903",
                                                "label": "气候监测预测人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022904",
                                                "label": "应用气象人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2022905",
                                                "label": "气象服务人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023001",
                                                "label": "地震工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023101",
                                                "label": "环境损害控制工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023102",
                                                "label": "环境监测工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023103",
                                                "label": "环境污染治理工程技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023104",
                                                "label": "灾害信息员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023201",
                                                "label": "安全工程技术人员(安全科学技术研究、开发与推广，安全工程设计施工、安全生产运行控制，安全检测、监督、评估，事故调查分析与预测预防)",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023202",
                                                "label": "安全防范系统安装维护员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023203",
                                                "label": "安全防范设计评估师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023301",
                                                "label": "标准化工程技术人员(从事技术、服务、管理标准化的研究和标准制定、实施、监督、管理的工程技术人员)",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023302",
                                                "label": "计量工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023303",
                                                "label": "质量工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023401",
                                                "label": "普通工业管理工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023402",
                                                "label": "系统规划与管理工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023403",
                                                "label": "设施规划与设计工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023404",
                                                "label": "生产组织与管理工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023405",
                                                "label": "质量管理与可靠性控制工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023406",
                                                "label": "营销工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2023407",
                                                "label": "人力资源开发与管理工程技术人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "203",
                                    "label": "农业技术人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2030101",
                                            "label": "土壤肥料技术人员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2030201",
                                                "label": "植物保护技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2030301",
                                                "label": "园艺技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2030401",
                                                "label": "作物遗传育种栽培技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2030501",
                                                "label": "兽医",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2030502",
                                                "label": "兽药技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2030601",
                                                "label": "畜牧技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2030602",
                                                "label": "草业技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2039901",
                                                "label": "农业技师、指导员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "204",
                                    "label": "飞机和船舶技术人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2040102",
                                            "label": "飞机机械员",
                                            "occupationType": "6",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2040103",
                                                "label": "飞行领航员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040104",
                                                "label": "飞行通信员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040201",
                                                "label": "甲板部技术人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040202",
                                                "label": "轮机部技术人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040203",
                                                "label": "船舶引航员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040204",
                                                "label": "船长",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040205",
                                                "label": "轮机长",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040206",
                                                "label": "大副",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040207",
                                                "label": "二副",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040208",
                                                "label": "三副",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040209",
                                                "label": "大管轮",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040210",
                                                "label": "二管轮",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040211",
                                                "label": "三管轮",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040212",
                                                "label": "报务员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040213",
                                                "label": "事务长",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040214",
                                                "label": "引水员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040301",
                                                "label": "民航飞机驾驶员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040302",
                                                "label": "民航飞机机械员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040303",
                                                "label": "民航飞行领航员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2040304",
                                                "label": "民航飞行通信员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "205",
                                    "label": "卫生专业技术人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2050101",
                                            "label": "内科医师",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2050102",
                                                "label": "外科医师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050103",
                                                "label": "儿科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050104",
                                                "label": "妇产科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050105",
                                                "label": "眼科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050106",
                                                "label": "耳鼻喉科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050107",
                                                "label": "口腔科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050108",
                                                "label": "皮肤科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050109",
                                                "label": "精神科医师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050110",
                                                "label": "心理医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050111",
                                                "label": "传染病科医师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050112",
                                                "label": "急诊科医师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050113",
                                                "label": "康复科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050114",
                                                "label": "麻醉科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050115",
                                                "label": "病理科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050116",
                                                "label": "放射科医师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050117",
                                                "label": "核医学医师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050118",
                                                "label": "超声诊断科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050119",
                                                "label": "放射肿瘤科医师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050120",
                                                "label": "全科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050121",
                                                "label": "乡村医师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050122",
                                                "label": "妇幼保健医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050123",
                                                "label": "输（采供）血医师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050201",
                                                "label": "中医内科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050202",
                                                "label": "中医外科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050203",
                                                "label": "中医妇科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050204",
                                                "label": "中医儿科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050205",
                                                "label": "中医眼科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050206",
                                                "label": "中医皮肤科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050207",
                                                "label": "中医骨伤科医师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050208",
                                                "label": "中医肛肠科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050209",
                                                "label": "中医耳鼻喉科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050210",
                                                "label": "针炙科医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050211",
                                                "label": "推拿按摩科医师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050301",
                                                "label": "中西医结合医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050401",
                                                "label": "民族医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050501",
                                                "label": "流行病学医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050502",
                                                "label": "营养与食品卫生医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050503",
                                                "label": "环境卫生医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050504",
                                                "label": "职业病医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050505",
                                                "label": "劳动(职业)卫生医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050506",
                                                "label": "放射卫生医师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050507",
                                                "label": "少儿和学校卫生医师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050508",
                                                "label": "健康管理师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050509",
                                                "label": "公共营养师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050601",
                                                "label": "西药剂师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050602",
                                                "label": "中药药师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050701",
                                                "label": "影像技师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050702",
                                                "label": "麻醉技师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050703",
                                                "label": "病理技师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050704",
                                                "label": "临床检验技师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050705",
                                                "label": "公卫检验技师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050706",
                                                "label": "卫生工程技师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050707",
                                                "label": "输(采供)血技师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050708",
                                                "label": "放射线之技术人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050709",
                                                "label": "放射线之修理人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050710",
                                                "label": "医学设备管理师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050801",
                                                "label": "病房护士",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050802",
                                                "label": "门诊护士",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050803",
                                                "label": "急诊护士",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050804",
                                                "label": "手术室护士",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050805",
                                                "label": "供应室护士",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050806",
                                                "label": "社区护士",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050807",
                                                "label": "助产士",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2050808",
                                                "label": "医疗救护员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2059901",
                                                "label": "一般医务行政人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2059902",
                                                "label": "监狱、看守所医生护理人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "206",
                                    "label": "经济业务人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2060101",
                                            "label": "经济计划人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2060201",
                                                "label": "统计人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2060301",
                                                "label": "会计人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2060401",
                                                "label": "审计人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2060501",
                                                "label": "国际商务人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2060601",
                                                "label": "品牌管理师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2060701",
                                                "label": "职业信息分析师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2060702",
                                                "label": "调查分析师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2060703",
                                                "label": "黄金投资分析师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "207",
                                    "label": "金融业务人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2070101",
                                            "label": "银行货币发行员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2070102",
                                                "label": "银行国库业务员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070103",
                                                "label": "银行外汇管理员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070104",
                                                "label": "银行清算员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070105",
                                                "label": "银行信贷员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070106",
                                                "label": "银行国际业务处理人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070107",
                                                "label": "银行信托业务处理人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070108",
                                                "label": "银行信用卡业务处理人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070109",
                                                "label": "银行储蓄员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070110",
                                                "label": "现金运送车司机、点钞员、押送员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070201",
                                                "label": "精算师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070202",
                                                "label": "保险推销员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070203",
                                                "label": "保险理赔员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070204",
                                                "label": "保险收费员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070205",
                                                "label": "保险调查员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070206",
                                                "label": "征信人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070301",
                                                "label": "证券发行员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070302",
                                                "label": "证券交易员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070303",
                                                "label": "证券投资顾问",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2070401",
                                                "label": "信用管理师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2079901",
                                                "label": "金融一般内勤人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2079902",
                                                "label": "金融外务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "208",
                                    "label": "法律专业人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2080101",
                                            "label": "法官",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2080201",
                                                "label": "检察官",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2080301",
                                                "label": "律师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2080401",
                                                "label": "公证员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2080501",
                                                "label": "法医",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2080601",
                                                "label": "书记员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2080701",
                                                "label": "商业犯罪调查处理人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "209",
                                    "label": "教学人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2090101",
                                            "label": "高等教育教师",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2090201",
                                                "label": "中等职业教育理论",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2090202",
                                                "label": "实习指导教师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2090301",
                                                "label": "中学教师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2090401",
                                                "label": "小学教师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2090501",
                                                "label": "幼儿教师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2090601",
                                                "label": "特殊教育教师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2090701",
                                                "label": "家庭教师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2099901",
                                                "label": "校工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2099902",
                                                "label": "军训教官、体育教师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2099903",
                                                "label": "汽车驾驶训练班教练",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2099904",
                                                "label": "各项运动教练",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2099906",
                                                "label": "飞行训练学员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2099907",
                                                "label": "一般学生",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2099908",
                                                "label": "学龄前儿童",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "210",
                                    "label": "文学艺术工作人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2100101",
                                            "label": "文学作家",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2100102",
                                                "label": "曲艺作家",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100103",
                                                "label": "剧作家",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100104",
                                                "label": "作曲家",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100105",
                                                "label": "词作家",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100106",
                                                "label": "文艺评论员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100107",
                                                "label": "皮影戏木偶戏作家",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100201",
                                                "label": "电影电视导演",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100202",
                                                "label": "戏剧导演",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100203",
                                                "label": "舞蹈编导",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100204",
                                                "label": "音乐指挥",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100205",
                                                "label": "武术指导",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100301",
                                                "label": "电影电视演员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100302",
                                                "label": "戏剧演员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100303",
                                                "label": "舞蹈演员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100304",
                                                "label": "曲艺演员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100305",
                                                "label": "杂技魔术演员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100306",
                                                "label": "歌唱演员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100307",
                                                "label": "皮影戏演员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100308",
                                                "label": "木偶戏演员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100312",
                                                "label": "配音演员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100401",
                                                "label": "民族乐器演奏员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100402",
                                                "label": "外国乐器演奏员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100501",
                                                "label": "电影电视制片",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100502",
                                                "label": "电影电视场记",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100503",
                                                "label": "电影电视摄影师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100504",
                                                "label": "照明师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100505",
                                                "label": "录音师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100506",
                                                "label": "剪辑师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100507",
                                                "label": "美工师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100508",
                                                "label": "化妆师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100509",
                                                "label": "置景师",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100510",
                                                "label": "道具师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100511",
                                                "label": "电影电视片发行人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100512",
                                                "label": "舞台监督",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100513",
                                                "label": "戏剧制作人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100514",
                                                "label": "影片商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100515",
                                                "label": "灯光及音响工作人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100516",
                                                "label": "冲片人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100517",
                                                "label": "洗片人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100518",
                                                "label": "机械工电工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100601",
                                                "label": "画家",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100602",
                                                "label": "篆刻家",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100603",
                                                "label": "雕塑家",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100604",
                                                "label": "书法家",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100605",
                                                "label": "陶艺家",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100701",
                                                "label": "特种工艺设计人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100702",
                                                "label": "实用工艺设计人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100703",
                                                "label": "现代工艺设计人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100704",
                                                "label": "装磺美术设计人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100705",
                                                "label": "服装设计人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100706",
                                                "label": "室内装饰设计人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100707",
                                                "label": "陈列展览设计人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2100708",
                                                "label": "广告设计人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "211",
                                    "label": "体育工作人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2110101",
                                            "label": "教练员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2110102",
                                                "label": "运动员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110103",
                                                "label": "球童",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110201",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110202",
                                                "label": "保龄球球员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110301",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110302",
                                                "label": "桌球球员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110401",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110402",
                                                "label": "羽毛球球员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110501",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110502",
                                                "label": "游泳队员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110601",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110602",
                                                "label": "射箭运动员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110701",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110702",
                                                "label": "网球球员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110801",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110802",
                                                "label": "垒球球员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2110901",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111001",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111002",
                                                "label": "射击人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111101",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111102",
                                                "label": "民族体育活动人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111201",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111301",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111401",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111501",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111502",
                                                "label": "棒球运动员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111601",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111602",
                                                "label": "田径运动员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111701",
                                                "label": "教练员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111801",
                                                "label": "教练员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111901",
                                                "label": "教练员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2111902",
                                                "label": "驾乘人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2112001",
                                                "label": "教练员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2112101",
                                                "label": "教练员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2112201",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2112202",
                                                "label": "巧固球球员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2112301",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2112601",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2112701",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2112702",
                                                "label": "曲棍球球员",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2112801",
                                                "label": "教练员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2112802",
                                                "label": "冰上曲棍球球员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2112901",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2113001",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2113101",
                                                "label": "教练员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2113201",
                                                "label": "教练员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2113301",
                                                "label": "教练员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2113401",
                                                "label": "教练员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2113601",
                                                "label": "裁判人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "212",
                                    "label": "新闻出版、文化工作人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2120101",
                                            "label": "文字记者",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2120102",
                                                "label": "摄影记者",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120103",
                                                "label": "外勤记者",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120105",
                                                "label": "电视记者",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120201",
                                                "label": "文字编辑",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120202",
                                                "label": "美术编辑",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120203",
                                                "label": "技术编辑",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120204",
                                                "label": "电子出版物编辑",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120301",
                                                "label": "校对员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120401",
                                                "label": "播音员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120402",
                                                "label": "节目主持人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120501",
                                                "label": "翻译",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120502",
                                                "label": "手语翻译员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120601",
                                                "label": "图书资料业务人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120602",
                                                "label": "档案业务人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120603",
                                                "label": "缩微摄影人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120604",
                                                "label": "图书馆工作人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120702",
                                                "label": "文物鉴定和保管人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120703",
                                                "label": "文物保护专业人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2120704",
                                                "label": "博物馆工作人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2129901",
                                                "label": "内勤人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "213",
                                    "label": "宗教职业者",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "2130001",
                                            "label": "宗教职业者",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "2130002",
                                                "label": "寺庙及教堂管理人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2130003",
                                                "label": "宗教团体工作人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "2130004",
                                                "label": "僧尼道士传教人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                }]
                        }
                    },
                    {
                        "value": "3",
                        "label": "办事人员和有关人员",
                        "children": {
                            "name": "job1",
                            "label": "请选择",
                            "options": [{
                                "value": "301",
                                "label": "行政办公人员",
                                "children": {
                                    "name": "block1",
                                    "label": "",
                                    "options": [{
                                        "value": "3010101",
                                        "label": "行政业务办公人员（内勤）",
                                        "occupationType": "1",
                                        "hospitalRisk": "1"
                                    },
                                        {
                                            "value": "3010102",
                                            "label": "行政业务办公人员（外勤）",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "3010103",
                                            "label": "工商、税务、海关、城管等特定国家机关行政执法人员",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "3010104",
                                            "label": "缉私人员",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "3010105",
                                            "label": "客户服务管理师",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "3010201",
                                            "label": "秘书",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "3010202",
                                            "label": "公务员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "3010203",
                                            "label": "收发员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "3010204",
                                            "label": "打字员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "3010205",
                                            "label": "计算机操作员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "3010206",
                                            "label": "制图员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        }]
                                }
                            },
                                {
                                    "value": "302",
                                    "label": "安全保卫和消防人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "3020101",
                                            "label": "警务行政及内勤人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "3020102",
                                                "label": "警察（负有巡逻任务者）",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020103",
                                                "label": "监狱看守所管理人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020104",
                                                "label": "交通警察",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020105",
                                                "label": "刑警",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020108",
                                                "label": "港口机场警卫及安全人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020201",
                                                "label": "保安员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020202",
                                                "label": "违禁品检查员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020203",
                                                "label": "金融守押员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020204",
                                                "label": "治安调查人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020304",
                                                "label": "抢险救援器材工具调配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020305",
                                                "label": "抢险救援器材维修工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020306",
                                                "label": "火险监督员、防火审核员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020307",
                                                "label": "可燃气体(毒气)检测员、危险物品监督员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3020310",
                                                "label": "火灾掺望观察员(直升机)",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "303",
                                    "label": "邮政和电信业务人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "3030101",
                                            "label": "邮政营业员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "3030102",
                                                "label": "邮件分检、接发员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030103",
                                                "label": "火车、汽车邮件押运员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030104",
                                                "label": "轮船邮件押运员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030105",
                                                "label": "报刊分发员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030106",
                                                "label": "投递员(外勤)",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030107",
                                                "label": "投递员(内勤)",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030108",
                                                "label": "邮政储汇员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030109",
                                                "label": "报刊发行、零售员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030110",
                                                "label": "集邮业务员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030111",
                                                "label": "邮政业务档案员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030112",
                                                "label": "邮政设备安装、维护人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030113",
                                                "label": "包裹邮务人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030114",
                                                "label": "包裹搬运人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030201",
                                                "label": "电信业务营业员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030202",
                                                "label": "话务员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030203",
                                                "label": "报务员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030301",
                                                "label": "通信设备维护人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030302",
                                                "label": "电话、通信天、馈线架(敷)设、维修人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030303",
                                                "label": "电话电报交换设备安装、维护人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030304",
                                                "label": "电话机、寻呼机、传真机等用户终端设备维修员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030305",
                                                "label": "通信系统供电设备、空调设备安装维护人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030306",
                                                "label": "市话障碍处理人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3030307",
                                                "label": "电信装置维护修理工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "304",
                                    "label": "广告从业人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "3040101",
                                            "label": "客户主任、统筹、设计师、市场拓展主任",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "3040102",
                                                "label": "撰稿员、一般内勤",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3040201",
                                                "label": "广告业务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3040202",
                                                "label": "广告招牌绘制人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3040203",
                                                "label": "广告片拍摄录制人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "305",
                                    "label": "设计和策划人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "3050101",
                                            "label": "会展设计师",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "3050102",
                                                "label": "会展策划师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "3050201",
                                                "label": "景观设计师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "306",
                                    "label": "绘制人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "3060101",
                                            "label": "建筑模型设计制作员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "3060202",
                                                "label": "动画绘制员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "307",
                                    "label": "影视从业人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "3070101",
                                            "label": "数字视频(DV)策划制作师",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        }]
                                    }
                                },
                                {
                                    "value": "308",
                                    "label": "物业管理和服务人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "3080101",
                                            "label": "智能楼宇管理师",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        }]
                                    }
                                }]
                        }
                    },
                    {
                        "value": "4",
                        "label": "商业、服务业人员",
                        "children": {
                            "name": "job1",
                            "label": "请选择",
                            "options": [{
                                "value": "401",
                                "label": "购销人员",
                                "children": {
                                    "name": "block1",
                                    "label": "",
                                    "options": [{
                                        "value": "4010101",
                                        "label": "营业员",
                                        "occupationType": "1",
                                        "hospitalRisk": "1"
                                    },
                                        {
                                            "value": "4010102",
                                            "label": "收银员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010201",
                                            "label": "推销员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010202",
                                            "label": "出版物发行员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010203",
                                            "label": "服装模特",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010301",
                                            "label": "采购员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010302",
                                            "label": "粮油、农副土特产品、蔬菜等商品收购员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010303",
                                            "label": "中药购销员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010401",
                                            "label": "旧货、古玩、字画等物品鉴定估价师",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010402",
                                            "label": "拍卖师",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010403",
                                            "label": "典当业务员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010404",
                                            "label": "租赁业务员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010501",
                                            "label": "废旧物资回收挑选工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010502",
                                            "label": "废旧物资加工工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010503",
                                            "label": "船舶拆解工(仪表拆解)",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010601",
                                            "label": "粮油管理员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010701",
                                            "label": "商品监督员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4010702",
                                            "label": "市场管理员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4019901",
                                            "label": "医药商品购销员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4019902",
                                            "label": "中药配方、制剂调配人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "4019903",
                                            "label": "个体摊贩",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        }]
                                }
                            },
                                {
                                    "value": "402",
                                    "label": "仓储人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "4020101",
                                            "label": "保管员",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "4020102",
                                                "label": "理货员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4020103",
                                                "label": "库存商品养护员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4020104",
                                                "label": "保鲜员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4020105",
                                                "label": "冷藏工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4020201",
                                                "label": "商品储运员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4020202",
                                                "label": "商品护运员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4020203",
                                                "label": "医药商品储运员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4020204",
                                                "label": "出版物储运员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4020205",
                                                "label": "货柜场检查员(控制室内)",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4020206",
                                                "label": "货柜场检查员(站立于货柜上)",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4020207",
                                                "label": "起重机操作员(于控制室内)",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4020208",
                                                "label": "起重机操作员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "403",
                                    "label": "餐饮服务人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "4030101",
                                            "label": "中式烹调师",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "4030102",
                                                "label": "中式面点师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4030201",
                                                "label": "西式烹调师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4030202",
                                                "label": "西式面点师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4030301",
                                                "label": "调酒师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4030302",
                                                "label": "茶艺师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4030303",
                                                "label": "咖啡师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4030401",
                                                "label": "营养配餐员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4030501",
                                                "label": "餐厅服务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4030502",
                                                "label": "餐具清洗保管员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4030503",
                                                "label": "经理人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4030504",
                                                "label": "一般内勤人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4030505",
                                                "label": "收帐员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "404",
                                    "label": "饭店、旅游及健身娱乐场所服务人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "4040101",
                                            "label": "前厅服务员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "4040102",
                                                "label": "客房服务员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040103",
                                                "label": "旅店服务员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040104",
                                                "label": "旅馆负责人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040105",
                                                "label": "一般内勤人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040106",
                                                "label": "外务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040107",
                                                "label": "收帐员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040108",
                                                "label": "技工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040201",
                                                "label": "导游",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040202",
                                                "label": "公共游览场所服务员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040203",
                                                "label": "展览讲解员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040204",
                                                "label": "插花员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040205",
                                                "label": "盆景工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040206",
                                                "label": "假山工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040207",
                                                "label": "园林植物保护工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040208",
                                                "label": "一般内勤人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040209",
                                                "label": "外务人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040301",
                                                "label": "群众性体育活动指导员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040302",
                                                "label": "体育场地维护、保养工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040303",
                                                "label": "康乐服务员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040304",
                                                "label": "保健按摩师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040305",
                                                "label": "桑拿业负责人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040306",
                                                "label": "桑拿业柜台人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040307",
                                                "label": "社会文化指导员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040308",
                                                "label": "芳香保健师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040401",
                                                "label": "教练",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040402",
                                                "label": "球场保养人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040403",
                                                "label": "维护工人",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040404",
                                                "label": "球童",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040504",
                                                "label": "清洁工人",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040501",
                                                "label": "记分员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040502",
                                                "label": "柜台人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040503",
                                                "label": "机械保护员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040601",
                                                "label": "负责人",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040602",
                                                "label": "记分员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040701",
                                                "label": "负责人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040702",
                                                "label": "管理员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040703",
                                                "label": "教练",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040704",
                                                "label": "售票员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040705",
                                                "label": "救生员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040801",
                                                "label": "负责人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040802",
                                                "label": "管理员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040804",
                                                "label": "售票员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040805",
                                                "label": "救生员",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040901",
                                                "label": "负责人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040902",
                                                "label": "售票员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040903",
                                                "label": "游戏机操作员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040904",
                                                "label": "一般清洁工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040905",
                                                "label": "兽栏清洁工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040906",
                                                "label": "水电机械工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040908",
                                                "label": "兽医(动物园)",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040909",
                                                "label": "观赏动物饲养工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4040910",
                                                "label": "猛兽饲养工(动物园)",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041001",
                                                "label": "咖啡厅工作人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041002",
                                                "label": "茶室工作人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041003",
                                                "label": "酒家工作人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041004",
                                                "label": "夜总会工作人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041005",
                                                "label": "迪斯科舞厅工作人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041006",
                                                "label": "歌厅工作人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041007",
                                                "label": "酒吧工作人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041008",
                                                "label": "娱乐餐饮业负责人",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041010",
                                                "label": "调酒师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041011",
                                                "label": "乐队人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041012",
                                                "label": "歌唱人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041014",
                                                "label": "迎宾",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041015",
                                                "label": "舞蹈演艺人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041016",
                                                "label": "电子游戏厅工作人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4041017",
                                                "label": "网吧管理人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "405",
                                    "label": "运输服务人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "4050101",
                                            "label": "汽车客运服务员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "4050102",
                                                "label": "汽车货运站务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050103",
                                                "label": "汽车运输调度员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050104",
                                                "label": "公路收费及监控员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050105",
                                                "label": "加油站工作人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050106",
                                                "label": "洗车工人",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050107",
                                                "label": "客运车稽核人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050109",
                                                "label": "出租车行、货运行之负责人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050110",
                                                "label": "外务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050111",
                                                "label": "内勤工作人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050112",
                                                "label": "车辆保管人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050113",
                                                "label": "汽车加气站操作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050201",
                                                "label": "旅客列车乘务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050202",
                                                "label": "车站客运服务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050203",
                                                "label": "货运计划员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050204",
                                                "label": "铁路行李员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050205",
                                                "label": "车站货运作业组织员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050206",
                                                "label": "车站货运员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050207",
                                                "label": "铁路站长",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050208",
                                                "label": "铁路票房工作人员、车站检票员、一般内勤人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050209",
                                                "label": "铁路播音员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050210",
                                                "label": "铁路服务台人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050211",
                                                "label": "铁路车站清洁工人",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050301",
                                                "label": "航空运输飞行服务员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050302",
                                                "label": "航空运输地面服务员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050303",
                                                "label": "航空站站长",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050304",
                                                "label": "一般内勤人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050305",
                                                "label": "塔台工作人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050306",
                                                "label": "关务人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050307",
                                                "label": "检查人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050308",
                                                "label": "运务人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050309",
                                                "label": "缉私人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050310",
                                                "label": "清洁工人（航空大厦内、机舱内）",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050311",
                                                "label": "机场内交通司机",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050312",
                                                "label": "行李货运搬运工人",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050313",
                                                "label": "加添燃料人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050314",
                                                "label": "飞机外壳洗刷人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050315",
                                                "label": "清洁工（登高、高墙或天花板）",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050316",
                                                "label": "跑道维护工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050317",
                                                "label": "票务人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050318",
                                                "label": "航空货运外务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050319",
                                                "label": "航空货运报关人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050320",
                                                "label": "航空货运理货员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050321",
                                                "label": "灯塔修理员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050322",
                                                "label": "喷气式民航班机乘务员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050323",
                                                "label": "机场运行指挥员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050401",
                                                "label": "船舶业务员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050402",
                                                "label": "船舶客运员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050403",
                                                "label": "港口客运员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050405",
                                                "label": "医务人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050407",
                                                "label": "实习生",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050408",
                                                "label": "码头工人及领班",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050409",
                                                "label": "堆高机操作员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050410",
                                                "label": "水上运输理货员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050411",
                                                "label": "报关员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4050404",
                                                "label": "随船厨师",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "406",
                                    "label": "医疗卫生辅助服务人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "4060101",
                                            "label": "病案员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "4060102",
                                                "label": "护理员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4060103",
                                                "label": "口腔修复工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4060104",
                                                "label": "配膳员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4060105",
                                                "label": "卫生检验员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4060106",
                                                "label": "医用气体工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4060107",
                                                "label": "药房辅助员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4060108",
                                                "label": "卫生防疫、妇幼保健员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4060109",
                                                "label": "医院炊事",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4060110",
                                                "label": "杂工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4060111",
                                                "label": "清洁工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "407",
                                    "label": "社会服务和居民生活服务人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "4070101",
                                            "label": "中介代理人",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "4070102",
                                                "label": "职业指导员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070103",
                                                "label": "经纪人(内勤)",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070104",
                                                "label": "创业咨询师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070105",
                                                "label": "婚姻家庭咨询师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070106",
                                                "label": "礼仪主持人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070107",
                                                "label": "体育经纪人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070108",
                                                "label": "商务策划师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070109",
                                                "label": "房地产策划师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070201",
                                                "label": "物业管理员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070301",
                                                "label": "工业及饮用水净化处理人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070302",
                                                "label": "工业及饮用水生产人员(水井工)",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070303",
                                                "label": "供水调度员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070304",
                                                "label": "水表装修工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070305",
                                                "label": "成型煤生产工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070306",
                                                "label": "送煤工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070308",
                                                "label": "电信电力系统内勤人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070309",
                                                "label": "抄表员、收费员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070310",
                                                "label": "自来水管装修人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070311",
                                                "label": "自来水厂水质分析员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070312",
                                                "label": "煤气工程师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070313",
                                                "label": "煤气管线装修工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070314",
                                                "label": "煤气检查员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070315",
                                                "label": "煤气储气槽、分装厂之工作人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070401",
                                                "label": "美容师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070402",
                                                "label": "美发师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070403",
                                                "label": "洗头工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070404",
                                                "label": "形象设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070405",
                                                "label": "调香师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070501",
                                                "label": "摄影师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070502",
                                                "label": "冲印师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070601",
                                                "label": "眼镜验光员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070602",
                                                "label": "眼镜定配工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070603",
                                                "label": "助听器验配师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070701",
                                                "label": "洗衣师、烫衣师、织补师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070702",
                                                "label": "染色师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070801",
                                                "label": "浴池服务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070802",
                                                "label": "修脚师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4070901",
                                                "label": "刻制印章工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071001",
                                                "label": "家用电子产品维修工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071002",
                                                "label": "家用电器产品维修工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071003",
                                                "label": "照相器材维修工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071004",
                                                "label": "钟表维修工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071005",
                                                "label": "乐器维修工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071006",
                                                "label": "自行车维修工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071007",
                                                "label": "锁具修理工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071101",
                                                "label": "办公设备维修工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071201",
                                                "label": "保育员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071202",
                                                "label": "家庭服务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071203",
                                                "label": "家庭主妇",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071204",
                                                "label": "孤残儿童护理员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071301",
                                                "label": "垃圾清运工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071302",
                                                "label": "保洁员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071303",
                                                "label": "下水道清洁工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071304",
                                                "label": "清洁打蜡工人",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071401",
                                                "label": "殡仪服务员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071402",
                                                "label": "尸体接运工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071403",
                                                "label": "尸体防腐工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071404",
                                                "label": "尸体整容工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071405",
                                                "label": "尸体火化工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071406",
                                                "label": "墓地管理员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071522",
                                                "label": "文具商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071523",
                                                "label": "布商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071524",
                                                "label": "服饰买卖商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071525",
                                                "label": "鱼贩",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071526",
                                                "label": "肉贩",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071527",
                                                "label": "屠宰",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071528",
                                                "label": "药品买卖商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071529",
                                                "label": "医疗器械仪器商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071530",
                                                "label": "化学原料商、农药买卖商",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071531",
                                                "label": "手工艺品买卖商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071532",
                                                "label": "银楼珠宝、当铺负责人及工作人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071533",
                                                "label": "农具商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071521",
                                                "label": "食品商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071501",
                                                "label": "橱具商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071502",
                                                "label": "陶瓷器商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071503",
                                                "label": "古董商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071504",
                                                "label": "花卉商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071505",
                                                "label": "米商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071506",
                                                "label": "杂货商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071507",
                                                "label": "玻璃商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071508",
                                                "label": "果菜商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071509",
                                                "label": "石材商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071510",
                                                "label": "建材商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071511",
                                                "label": "铁材商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071512",
                                                "label": "木材商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071513",
                                                "label": "五金商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071514",
                                                "label": "电器商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071515",
                                                "label": "水电卫生器材商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071516",
                                                "label": "机车买卖商(不含修理)",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071517",
                                                "label": "汽车买卖商(不含修理)",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071518",
                                                "label": "车辆器材商",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071519",
                                                "label": "矿物油、香烛买卖商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071520",
                                                "label": "眼镜商",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071601",
                                                "label": "负责人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071602",
                                                "label": "店员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071603",
                                                "label": "送货员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071604",
                                                "label": "装饰工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071701",
                                                "label": "负责人及工作人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4071702",
                                                "label": "售货商",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "499",
                                    "label": "其他商业、服务业人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "4990001",
                                            "label": "出版物送货员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "4990002",
                                                "label": "送报员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990003",
                                                "label": "公证行外务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990004",
                                                "label": "报关行外务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990005",
                                                "label": "鞋匠、伞匠",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990006",
                                                "label": "代书(内勤)",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990007",
                                                "label": "勘察师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990008",
                                                "label": "地磅场工作人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990009",
                                                "label": "豆制品工艺师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990010",
                                                "label": "呼叫服务员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990011",
                                                "label": "牛肉分级员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990012",
                                                "label": "首饰设计制作员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990013",
                                                "label": "酿酒师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990014",
                                                "label": "照明设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990015",
                                                "label": "模具设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990016",
                                                "label": "纺织面料设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990017",
                                                "label": "玩具设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990018",
                                                "label": "花艺环境设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990019",
                                                "label": "霓虹灯制作员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990020",
                                                "label": "糖果工艺师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990021",
                                                "label": "陶瓷产品设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990022",
                                                "label": "皮具设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990023",
                                                "label": "珠宝首饰评估师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990024",
                                                "label": "家具设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990025",
                                                "label": "地毯设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990026",
                                                "label": "家用纺织品设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990027",
                                                "label": "企业文化师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "4990028",
                                                "label": "网络课件设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                }]
                        }
                    },
                    {
                        "value": "5",
                        "label": "农、林、牧、渔、水利业生产人员",
                        "children": {
                            "name": "job1",
                            "label": "请选择",
                            "options": [{
                                "value": "501",
                                "label": "种植业生产人员",
                                "children": {
                                    "name": "block1",
                                    "label": "",
                                    "options": [{
                                        "value": "5010101",
                                        "label": "农夫",
                                        "occupationType": "2",
                                        "hospitalRisk": "1"
                                    },
                                        {
                                            "value": "5010102",
                                            "label": "啤酒花生产工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010103",
                                            "label": "作物种子繁育工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010104",
                                            "label": "农作物病虫草害防治工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010105",
                                            "label": "农场经营者(不亲自作业)",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010106",
                                            "label": "长短工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010107",
                                            "label": "山、林承包商",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010108",
                                            "label": "农业技术指导人员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010201",
                                            "label": "农业实验工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010202",
                                            "label": "农情测报员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010301",
                                            "label": "蔬菜园艺工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010302",
                                            "label": "花卉园艺工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010304",
                                            "label": "菌类园艺工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010401",
                                            "label": "天然橡胶生产工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010402",
                                            "label": "剑麻生产工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010501",
                                            "label": "中药材种植员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010502",
                                            "label": "中药材养殖员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010503",
                                            "label": "中药材生产管理员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010601",
                                            "label": "棉花加工工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010602",
                                            "label": "果类产品加工工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010603",
                                            "label": "茶叶加工工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010604",
                                            "label": "蔬菜加工工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010606",
                                            "label": "特种植物原料加工工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010607",
                                            "label": "糖厂技工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "5010608",
                                            "label": "农作物种子加工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        }]
                                }
                            },
                                {
                                    "value": "502",
                                    "label": "林业生产及野生动植物保护人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "5020101",
                                            "label": "林木种苗工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "5020102",
                                                "label": "造林更新工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020103",
                                                "label": "抚育采伐工",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020104",
                                                "label": "营林试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020105",
                                                "label": "领班",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020106",
                                                "label": "实验室育苗栽培人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020201",
                                                "label": "护林员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020202",
                                                "label": "森林病虫害防治员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020203",
                                                "label": "森林防火员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020204",
                                                "label": "木材防腐师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020301",
                                                "label": "野生动物保护员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020302",
                                                "label": "野生植物保护员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020303",
                                                "label": "自然保护区巡护监测员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020304",
                                                "label": "动植物标本员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020406",
                                                "label": "运材车辆之司机及押运人员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020407",
                                                "label": "起重机之操作人员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5020408",
                                                "label": "领班、监工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "503",
                                    "label": "畜牧业生产人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "5030101",
                                            "label": "家畜饲养工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "5030102",
                                                "label": "家畜繁殖工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030103",
                                                "label": "畜牧场经营者(不亲自作业)",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030104",
                                                "label": "驯犬人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030105",
                                                "label": "畜牧工作人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030106",
                                                "label": "宠物训导师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030201",
                                                "label": "家禽饲养工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030202",
                                                "label": "家禽繁殖工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030301",
                                                "label": "蜜蜂饲养工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030302",
                                                "label": "蜂产品加工工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030401",
                                                "label": "实验动物饲养工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030501",
                                                "label": "动物疫病防治员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030502",
                                                "label": "兽医化验员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030503",
                                                "label": "动物检疫检验员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030504",
                                                "label": "中兽医员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030505",
                                                "label": "宠物健康护理人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030601",
                                                "label": "草地监护员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030602",
                                                "label": "牧草培育、加工人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5030603",
                                                "label": "草坪建植工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "504",
                                    "label": "渔业生产人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "5040101",
                                            "label": "水生动物苗种繁育工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "5040102",
                                                "label": "水生植物苗种培育工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040103",
                                                "label": "水生动物饲养工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040107",
                                                "label": "生物饵料培养工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040109",
                                                "label": "渔场经营者(不亲自作业)",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040110",
                                                "label": "渔场经营者(亲自作业)",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040111",
                                                "label": "热带鱼养殖者、水族馆经营者",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040113",
                                                "label": "水生哺乳动物训养师",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040201",
                                                "label": "水产捕捞工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040204",
                                                "label": "渔网具装配工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040301",
                                                "label": "水产品原料处理工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040302",
                                                "label": "水产品腌熏烤制工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040303",
                                                "label": "鱼糜及鱼糜制品加工工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040304",
                                                "label": "鱼粉加工工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040305",
                                                "label": "鱼肝油及制品加工工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040306",
                                                "label": "海藻制碘工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040307",
                                                "label": "海藻制醇工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040308",
                                                "label": "海藻制胶工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040309",
                                                "label": "海藻食品加工工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5040310",
                                                "label": "贝类净化工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5049902",
                                                "label": "水产养殖质量管理员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5049903",
                                                "label": "水产品质量检验员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5049901",
                                                "label": "水产实验人员(室内)",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "505",
                                    "label": "水利设施管理养护人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "5050101",
                                            "label": "河道修防工(堤、坝施工人员)",
                                            "occupationType": "5",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "5050102",
                                                "label": "草皮、防浪林种植养护人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050103",
                                                "label": "河道、堤防巡护人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050104",
                                                "label": "混凝土工程维修工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050105",
                                                "label": "土石工程维修工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050106",
                                                "label": "水工检测工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050107",
                                                "label": "建(构)筑物有害动物防治工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050108",
                                                "label": "水坝水库管理人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050109",
                                                "label": "水域环境养护保洁员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050201",
                                                "label": "灌排工程施工、运行、管护人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050202",
                                                "label": "渠道维护工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050203",
                                                "label": "灌区供水工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050204",
                                                "label": "灌溉试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050301",
                                                "label": "水土保持防治工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050302",
                                                "label": "水土保持测试工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050303",
                                                "label": "水土保持勘测工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050401",
                                                "label": "水文勘测工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5050402",
                                                "label": "水文勘测船工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5059901",
                                                "label": "水利工程设施人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "599",
                                    "label": "其他农、林、牧、渔、水利业生产人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "5990101",
                                            "label": "拖拉机驾驶员",
                                            "occupationType": "5",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "5990102",
                                                "label": "联合收割机驾驶员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5990103",
                                                "label": "农用运输车驾驶员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5990104",
                                                "label": "农业机械操作或修理人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5990201",
                                                "label": "沼气工程施工人员",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5990202",
                                                "label": "沼气设备安装、调试、检修人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5990203",
                                                "label": "沼气生产管理人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5990204",
                                                "label": "农村节能员(灶、坑、炉、窑建造改造人员)",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5990205",
                                                "label": "农用太阳能设施工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "5990206",
                                                "label": "生物质能设备工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                }]
                        }
                    },
                    {
                        "value": "6",
                        "label": "生产、运输设备操作人员及有关人员",
                        "children": {
                            "name": "job1",
                            "label": "请选择",
                            "options": [{
                                "value": "601",
                                "label": "勘测及矿物开采人员",
                                "children": {
                                    "name": "block1",
                                    "label": "",
                                    "options": [{
                                        "value": "6010105",
                                        "label": "采样工",
                                        "occupationType": "4",
                                        "hospitalRisk": "1"
                                    },
                                        {
                                            "value": "6010108",
                                            "label": "海洋土质试验工",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010109",
                                            "label": "固体岩矿样碎样工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010110",
                                            "label": "岩矿和古生物样品磨片工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010111",
                                            "label": "重沙样品淘洗工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010112",
                                            "label": "劈岩与保管工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010201",
                                            "label": "大地测量工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010202",
                                            "label": "摄影测量工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010203",
                                            "label": "地图制图工",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010204",
                                            "label": "工程测量工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010205",
                                            "label": "地籍测绘工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010310",
                                            "label": "矿山安全监测工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010311",
                                            "label": "矿山检查验收工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010312",
                                            "label": "矿灯、自救器管理工",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010316",
                                            "label": "经营者(不到现场)",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010317",
                                            "label": "经营者(现场监督者)",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010318",
                                            "label": "经理人员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010401",
                                            "label": "筛选破碎工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010402",
                                            "label": "重力选矿工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010403",
                                            "label": "浮选工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010404",
                                            "label": "磁选工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010405",
                                            "label": "选矿脱水工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010406",
                                            "label": "尾矿处理工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010407",
                                            "label": "磨矿工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010408",
                                            "label": "水煤浆制备工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010409",
                                            "label": "动力配煤工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010410",
                                            "label": "工业型煤加工制作人员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010506",
                                            "label": "钻勘设备安装换修保养工人",
                                            "occupationType": "5",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010605",
                                            "label": "天然气净化工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010606",
                                            "label": "油气输送工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010607",
                                            "label": "油气管道保护工",
                                            "occupationType": "5",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010608",
                                            "label": "行政人员",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010609",
                                            "label": "技术员",
                                            "occupationType": "5",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010701",
                                            "label": "海盐晒制工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010702",
                                            "label": "海盐采收工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010705",
                                            "label": "湖盐脱水工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010706",
                                            "label": "驳筑、集拆坨盐工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010707",
                                            "label": "井矿盐采卤工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010708",
                                            "label": "井矿盐卤水净化工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010709",
                                            "label": "真空制盐工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010710",
                                            "label": "冷冻提硝工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010711",
                                            "label": "苦卤综合利用工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "6010712",
                                            "label": "精制盐工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        }]
                                }
                            },
                                {
                                    "value": "602",
                                    "label": "金属冶炼、轧制人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6020208",
                                            "label": "技师",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6020209",
                                                "label": "工程师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6020210",
                                                "label": "领班、监工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6020301",
                                                "label": "铁合金原料工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                        ]
                                    }
                                },
                                {
                                    "value": "603",
                                    "label": "化工产品生产人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6030103",
                                            "label": "气体净化工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6030104",
                                                "label": "过滤工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030105",
                                                "label": "油加热工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030106",
                                                "label": "制冷工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030107",
                                                "label": "蒸发工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030108",
                                                "label": "蒸馏工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030109",
                                                "label": "萃取工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030110",
                                                "label": "吸收工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030111",
                                                "label": "吸附工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030112",
                                                "label": "干燥工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030113",
                                                "label": "结晶工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030114",
                                                "label": "造粒工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030117",
                                                "label": "化工总控工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030201",
                                                "label": "燃料油生产工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030202",
                                                "label": "润滑油、脂生产工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030203",
                                                "label": "石油产品精制工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030401",
                                                "label": "合成氨生产工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030402",
                                                "label": "尿素生产工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030403",
                                                "label": "硝酸铵生产工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030404",
                                                "label": "碳酸氢铵生产工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030407",
                                                "label": "复合磷肥生产工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030408",
                                                "label": "钙镁磷肥生产工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030409",
                                                "label": "氯化钾生产工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030410",
                                                "label": "微量元素混肥生产工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030509",
                                                "label": "无机化学反应工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030510",
                                                "label": "高频等离子工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030515",
                                                "label": "工程师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030516",
                                                "label": "技师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030902",
                                                "label": "湿纺原液制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030903",
                                                "label": "纺丝工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030904",
                                                "label": "化纤后处理工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030905",
                                                "label": "纺丝凝固浴液配制工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030906",
                                                "label": "无纺布制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6030907",
                                                "label": "化纤纺丝精密组件工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031001",
                                                "label": "合成革制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031101",
                                                "label": "有机合成工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031102",
                                                "label": "农药生物测试试验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031103",
                                                "label": "染料标准工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031104",
                                                "label": "染料应用试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031105",
                                                "label": "染料拼混工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031106",
                                                "label": "研磨分散工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031107",
                                                "label": "催化剂制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031108",
                                                "label": "催化剂试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031109",
                                                "label": "涂料合成树脂工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031110",
                                                "label": "制漆配色调制工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031111",
                                                "label": "溶剂制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031112",
                                                "label": "化学试剂制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031113",
                                                "label": "化工添加剂制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031201",
                                                "label": "片基制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031202",
                                                "label": "感光材料制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031203",
                                                "label": "感光材料试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031204",
                                                "label": "暗盒制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031205",
                                                "label": "废片、白银回收工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031206",
                                                "label": "磁粉制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031207",
                                                "label": "磁记录材料制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031208",
                                                "label": "磁记录材料试验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031209",
                                                "label": "感光鼓涂敷工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031501",
                                                "label": "松香工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031502",
                                                "label": "松节油制品工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031503",
                                                "label": "活性炭生产工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031504",
                                                "label": "栲胶生产工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031505",
                                                "label": "紫胶生产工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031506",
                                                "label": "栓皮制品工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031507",
                                                "label": "木材水解工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031601",
                                                "label": "树脂基复合材料工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031602",
                                                "label": "橡胶基复合材料工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031603",
                                                "label": "碳基复合材料工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031604",
                                                "label": "陶瓷基复合材料工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031605",
                                                "label": "复合固体推进剂成型工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031606",
                                                "label": "复合固体发动机装药工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031607",
                                                "label": "飞机复合材料制品工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031701",
                                                "label": "制皂工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031702",
                                                "label": "甘油工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031703",
                                                "label": "脂肪酸工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031704",
                                                "label": "洗衣粉成型工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031705",
                                                "label": "合成洗涤剂制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031706",
                                                "label": "香料制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031707",
                                                "label": "香精制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031708",
                                                "label": "化妆品配制工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031709",
                                                "label": "牙膏制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031710",
                                                "label": "油墨制造工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031711",
                                                "label": "制胶工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6031713",
                                                "label": "蜡烛制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6039901",
                                                "label": "电子绝缘与介质材料制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "604",
                                    "label": "机械制造加工人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6040102",
                                            "label": "铣工",
                                            "occupationType": "5",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6040103",
                                                "label": "刨工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040104",
                                                "label": "磨工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040105",
                                                "label": "镗工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040106",
                                                "label": "钻床工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040107",
                                                "label": "组合机床操作工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040108",
                                                "label": "加工中心操作工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040109",
                                                "label": "制齿工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040110",
                                                "label": "螺丝纹挤形工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040111",
                                                "label": "抛磨光工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040112",
                                                "label": "拉床工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040113",
                                                "label": "锯床工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040114",
                                                "label": "刃具扭制工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040115",
                                                "label": "弹性元件制造工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040116",
                                                "label": "技师",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040117",
                                                "label": "领班、监工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040119",
                                                "label": "车床工(全自动)",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040502",
                                                "label": "涂装工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040601",
                                                "label": "磨料制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040602",
                                                "label": "磨具制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040701",
                                                "label": "金属软管、波纹管工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6040702",
                                                "label": "卫星光学冷加工工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6049902",
                                                "label": "仪器仪表元件制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6049903",
                                                "label": "真空干燥处理工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6049904",
                                                "label": "人造宝石制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6049905",
                                                "label": "装配工、品管人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "605",
                                    "label": "机电产品装配人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6050101",
                                            "label": "基础件装配工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6050102",
                                                "label": "部件装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050301",
                                                "label": "汽轮机装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050302",
                                                "label": "内燃机装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050304",
                                                "label": "电机装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050306",
                                                "label": "数控机床装调维修工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050402",
                                                "label": "绝缘制品件装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050403",
                                                "label": "线圈绕制工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050404",
                                                "label": "绝缘处理浸渍工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050406",
                                                "label": "高低压电器装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050407",
                                                "label": "电焊机装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050408",
                                                "label": "电炉装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050409",
                                                "label": "电线电缆制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050410",
                                                "label": "技师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050501",
                                                "label": "电子专用设备装调工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050502",
                                                "label": "真空测试工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050601",
                                                "label": "仪器仪表元器件装调工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050602",
                                                "label": "力学仪器仪表装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050603",
                                                "label": "电子仪器仪表装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050604",
                                                "label": "光电仪器仪表装调工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050605",
                                                "label": "分析仪器仪表装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050606",
                                                "label": "计时仪器仪表装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050607",
                                                "label": "工业自动化仪器仪表与装置装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050608",
                                                "label": "电工仪器仪表装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050701",
                                                "label": "汽车(拖拉机)装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050706",
                                                "label": "铁路机车车辆制动修造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050707",
                                                "label": "电机车装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050708",
                                                "label": "摩托车装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050709",
                                                "label": "助动车、自行车装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050710",
                                                "label": "工程师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050711",
                                                "label": "技师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050712",
                                                "label": "领班、监工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050713",
                                                "label": "试车人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050714",
                                                "label": "汽车模型工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050801",
                                                "label": "功能膜工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050802",
                                                "label": "电渗析器工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050901",
                                                "label": "医疗器械装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050902",
                                                "label": "假肢制作装配工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6050903",
                                                "label": "矫形器制作装配工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051002",
                                                "label": "电冰箱、电冰柜制造装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051003",
                                                "label": "洗衣机制造装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051004",
                                                "label": "小型家用电器装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051005",
                                                "label": "缝纫机制造装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051006",
                                                "label": "办公小机械制造装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051007",
                                                "label": "技师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051008",
                                                "label": "一般制造工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051009",
                                                "label": "包装工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051010",
                                                "label": "瓦斯器具制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051101",
                                                "label": "工具五金制作工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051102",
                                                "label": "建筑五金制品制作工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051103",
                                                "label": "制锁工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051104",
                                                "label": "铝制品制作工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051105",
                                                "label": "日用五金制品制作工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051106",
                                                "label": "金属家具制造工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051107",
                                                "label": "金属家具修理工人",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051201",
                                                "label": "装甲车辆装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051202",
                                                "label": "装甲车辆装配检验工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051203",
                                                "label": "装甲车辆驾驶试验工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051204",
                                                "label": "装甲车辆发动机装试工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051302",
                                                "label": "火炮装试检验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051303",
                                                "label": "火炮随动系统装试工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051304",
                                                "label": "火炮随动系统装试检验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051305",
                                                "label": "火炮膛线制作工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051306",
                                                "label": "枪支装配工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051307",
                                                "label": "枪管校直工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051308",
                                                "label": "枪管膛线制作工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051702",
                                                "label": "防毒器材装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051703",
                                                "label": "防毒器材试验工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051701",
                                                "label": "滤毒材料制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051802",
                                                "label": "船舶轮机装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051803",
                                                "label": "船舶电气装配工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051804",
                                                "label": "船舶附件制造工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051805",
                                                "label": "船舶木塑帆缆工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051806",
                                                "label": "船模制造试验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051807",
                                                "label": "工程师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051808",
                                                "label": "领班",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051901",
                                                "label": "飞机装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051902",
                                                "label": "飞机系统安装调试工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051903",
                                                "label": "机载导弹装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051904",
                                                "label": "航空发动机装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051905",
                                                "label": "飞机螺旋桨装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051906",
                                                "label": "飞机军械安装调试工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051907",
                                                "label": "航空电气安装调试工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051908",
                                                "label": "飞机发动机附件装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051909",
                                                "label": "航空仪表装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051910",
                                                "label": "飞机仪表安装试验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051911",
                                                "label": "航空装配平衡工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051912",
                                                "label": "飞机无线电设备安装调试工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051913",
                                                "label": "飞机雷达安装调试工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051914",
                                                "label": "飞机特种设备检测与修理工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051915",
                                                "label": "飞机透明件制造胶接装配工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6051916",
                                                "label": "飞机外场调试与维护工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052001",
                                                "label": "飞机试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052002",
                                                "label": "机载导弹例行试验工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052003",
                                                "label": "航空发动机试车工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052004",
                                                "label": "飞机螺旋桨试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052005",
                                                "label": "飞机、发动机附件试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052006",
                                                "label": "航空环控救生装备试验工(地面试验)",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052008",
                                                "label": "航空仪表试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052009",
                                                "label": "航空电机电器试验设备调试工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052101",
                                                "label": "惯性器件装配厂",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052102",
                                                "label": "伺服机构装配调试工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052103",
                                                "label": "导弹部段装配工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052301",
                                                "label": "航天器环境试验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052302",
                                                "label": "航天器结构强度环境试验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052303",
                                                "label": "航天器结构高低温环境试验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052304",
                                                "label": "火箭发动机介质试验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052305",
                                                "label": "航天器系统试验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052306",
                                                "label": "空间环境模拟光学装测工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052307",
                                                "label": "空间环境模拟温度试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052308",
                                                "label": "空间环境模拟真空试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6052402",
                                                "label": "靶场测试工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6059901",
                                                "label": "技师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6059902",
                                                "label": "领班、监工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "606",
                                    "label": "机械设备修理人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6060101",
                                            "label": "机修钳工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6060102",
                                                "label": "汽车修理工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6060104",
                                                "label": "修理保养工人(自行车)",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6060105",
                                                "label": "装配修理工、冷冻修理厂工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6060106",
                                                "label": "汽车玻璃维修工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6060107",
                                                "label": "工程机械修理工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6060201",
                                                "label": "工业自动化仪器仪表与装置修理工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6060202",
                                                "label": "电工仪器仪表修理工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6060203",
                                                "label": "精密仪器仪表修理工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6060301",
                                                "label": "民用航空器维护人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6060302",
                                                "label": "民用航空器修理人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6060303",
                                                "label": "机械员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "607",
                                    "label": "电力设备安装、运行、检修及供电人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6070101",
                                            "label": "水轮机设备安装工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6070102",
                                                "label": "锅炉设备安装工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070103",
                                                "label": "汽轮机设备安装工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070104",
                                                "label": "发电机设备安装工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070105",
                                                "label": "热工仪表及控制装置安装试验工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070106",
                                                "label": "发电厂电气设备安装工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070109",
                                                "label": "电力工程内线安装工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070201",
                                                "label": "水轮发电机值班员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070202",
                                                "label": "燃料值班员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070203",
                                                "label": "锅炉运行值班员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070204",
                                                "label": "锅炉辅机值班员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070205",
                                                "label": "汽轮机运行值班员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070206",
                                                "label": "热力网值班员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070207",
                                                "label": "电气值班员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070208",
                                                "label": "集控值班员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070209",
                                                "label": "发电机氢冷值班员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070210",
                                                "label": "电厂水处理值班员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070301",
                                                "label": "送电、配电线路工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070302",
                                                "label": "变电站值班员",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070303",
                                                "label": "调相机值班员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070304",
                                                "label": "换流站值班员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070402",
                                                "label": "锅炉附属设备检修工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070403",
                                                "label": "汽轮机本体设备检修工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070404",
                                                "label": "汽轮机附属设备检修工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070405",
                                                "label": "发电厂电动机检修工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070406",
                                                "label": "水轮机检修工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070407",
                                                "label": "水电站水力机械试验工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070408",
                                                "label": "水电自动装置检修工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070412",
                                                "label": "电气试验员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070413",
                                                "label": "继电保护员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070414",
                                                "label": "电力装置维护修理工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070501",
                                                "label": "电力负荷控制员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070502",
                                                "label": "用电监察员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070503",
                                                "label": "装表核算收费员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070504",
                                                "label": "装表接电工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070505",
                                                "label": "电能计量装置检修工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070601",
                                                "label": "变电设备安装工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070602",
                                                "label": "变配电室值班电工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070603",
                                                "label": "常用电机检修工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6070605",
                                                "label": "维修电工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "608",
                                    "label": "电子元器件与设备制造、装配调试及维修人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6080101",
                                            "label": "真空电子器件化学零件制造工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6080102",
                                                "label": "电极丝制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080103",
                                                "label": "真空电子器件金属零件制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080104",
                                                "label": "电子真空镀膜工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080105",
                                                "label": "真空电子器件装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080106",
                                                "label": "真空电子器件装调工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080107",
                                                "label": "液晶显示器件制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080108",
                                                "label": "单晶片加工工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080109",
                                                "label": "半导体芯片制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080110",
                                                "label": "半导体分立器件、集成电路装调工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080111",
                                                "label": "电子用水制备工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080112",
                                                "label": "技师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080113",
                                                "label": "领班、监工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080114",
                                                "label": "制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080201",
                                                "label": "电阻器制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080202",
                                                "label": "电容器制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080203",
                                                "label": "微波铁氧体元器件制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080204",
                                                "label": "石英晶体生长设备操作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080205",
                                                "label": "压电石英晶片加工工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080206",
                                                "label": "石英晶体元器件制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080207",
                                                "label": "电声器件制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080208",
                                                "label": "水声换能器制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080209",
                                                "label": "专用继电器制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080210",
                                                "label": "高频电感器件制造工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080211",
                                                "label": "接插件制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080212",
                                                "label": "磁头制造工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080213",
                                                "label": "电子产品制版工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080214",
                                                "label": "印制电路制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080215",
                                                "label": "薄膜加热器制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080216",
                                                "label": "激光头制造工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080303",
                                                "label": "原电池制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080304",
                                                "label": "热电池制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080305",
                                                "label": "太阳电池制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080306",
                                                "label": "电池制造(技师)",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080401",
                                                "label": "无线电设备机械装校工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080402",
                                                "label": "电子设备装接工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080403",
                                                "label": "无线电调试工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080404",
                                                "label": "雷达装配工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080405",
                                                "label": "雷达调试工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080406",
                                                "label": "电子精密机械装调工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080407",
                                                "label": "电子计算机(微机)调试工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080408",
                                                "label": "有线通信传输设备调试工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080409",
                                                "label": "通讯交换设备调试工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080410",
                                                "label": "电源调试工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080411",
                                                "label": "激光机装调工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080412",
                                                "label": "激光全息工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080413",
                                                "label": "铁路通信组调工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080414",
                                                "label": "铁路信号组调工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080415",
                                                "label": "铁路电控组调工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080416",
                                                "label": "包装工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080417",
                                                "label": "集成电路测试员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080501",
                                                "label": "电子计算机(微机)维修工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080502",
                                                "label": "修理工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6080503",
                                                "label": "家电用品维修人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "609",
                                    "label": "橡胶和塑料制品生产人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6090101",
                                            "label": "橡胶制品配料工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6090201",
                                                "label": "塑料制品配料工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6090202",
                                                "label": "塑料制品成型制作工(自动)",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6090203",
                                                "label": "塑胶射出成型人员(其它)",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6099901",
                                                "label": "工程师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6099902",
                                                "label": "技师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6099903",
                                                "label": "领班、监工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6099904",
                                                "label": "一般工人",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "610",
                                    "label": "纺织、针织、印染人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6100101",
                                            "label": "纤维验配工",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6100102",
                                                "label": "开清棉工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100103",
                                                "label": "纤维染色工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100104",
                                                "label": "加湿软麻工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100105",
                                                "label": "选剥煮茧工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100106",
                                                "label": "纤维梳理工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100107",
                                                "label": "并条工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100108",
                                                "label": "粗纱工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100109",
                                                "label": "绢纺精炼工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100201",
                                                "label": "细纱工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100202",
                                                "label": "简并摇工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100203",
                                                "label": "捻线工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100204",
                                                "label": "制线工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100205",
                                                "label": "缫丝工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100301",
                                                "label": "整经工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100302",
                                                "label": "浆纱工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100303",
                                                "label": "穿经工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100304",
                                                "label": "织布工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100305",
                                                "label": "织物验修工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100306",
                                                "label": "意匠纹版工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100307",
                                                "label": "织造工人",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100401",
                                                "label": "纬编工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100402",
                                                "label": "经编工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100403",
                                                "label": "横机工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100404",
                                                "label": "织袜工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100405",
                                                "label": "铸、钳针工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100501",
                                                "label": "坯布检查处理工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100502",
                                                "label": "印染烧毛工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100503",
                                                "label": "煮炼漂工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100504",
                                                "label": "印染洗涤工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100505",
                                                "label": "印染烘干工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100506",
                                                "label": "印染丝光工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100507",
                                                "label": "印染定型工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100508",
                                                "label": "纺织针织染色工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100509",
                                                "label": "印花工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100510",
                                                "label": "印染雕刻制版工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100511",
                                                "label": "印染后整理工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100512",
                                                "label": "印染成品定等装潢工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100513",
                                                "label": "印染染化料配制工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100514",
                                                "label": "工艺染织制作工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6100515",
                                                "label": "染整工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6109901",
                                                "label": "技师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "611",
                                    "label": "裁剪缝纫和皮革、毛皮制品加工制作人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6110101",
                                            "label": "裁剪工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6110102",
                                                "label": "缝纫工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6110103",
                                                "label": "缝纫品整型工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6110104",
                                                "label": "裁缝",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6110105",
                                                "label": "剧装工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6110106",
                                                "label": "设计师",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6110201",
                                                "label": "制鞋工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6110202",
                                                "label": "制帽工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6110401",
                                                "label": "缝纫制品充填处理工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6110402",
                                                "label": "胶制服装上胶工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6110403",
                                                "label": "服装水洗工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "612",
                                    "label": "粮油、食品、饮料生产加工及饲料生产加工人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6120101",
                                            "label": "制米工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6120102",
                                                "label": "制粉工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120103",
                                                "label": "制油工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120201",
                                                "label": "食糖制造工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120202",
                                                "label": "糖果制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120203",
                                                "label": "巧克力制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120301",
                                                "label": "乳品预处理工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120302",
                                                "label": "乳品加工工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120303",
                                                "label": "冷食品制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120304",
                                                "label": "速冻食品制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120305",
                                                "label": "食品罐头加工工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120306",
                                                "label": "饮料制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120401",
                                                "label": "白酒酿造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120402",
                                                "label": "啤酒酿造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120403",
                                                "label": "黄酒酿造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120404",
                                                "label": "果露酒酿造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120405",
                                                "label": "洒精制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120501",
                                                "label": "酶制剂制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120502",
                                                "label": "柠檬酸制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120503",
                                                "label": "酱油酱类制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120504",
                                                "label": "食醋制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120505",
                                                "label": "酱腌菜制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120506",
                                                "label": "食用调料制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120507",
                                                "label": "味精制作工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120601",
                                                "label": "糕点、面包烘焙工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120602",
                                                "label": "糕点装饰工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120603",
                                                "label": "米面主食制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120604",
                                                "label": "油脂制品工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120605",
                                                "label": "植物蛋白制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120606",
                                                "label": "豆制品制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120701",
                                                "label": "猪屠宰加工工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120702",
                                                "label": "牛羊屠宰加工工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120703",
                                                "label": "肠衣工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120704",
                                                "label": "禽类屠宰加工工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120801",
                                                "label": "熟肉制品加工工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120802",
                                                "label": "蛋品及再制蛋品加工工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120901",
                                                "label": "饲料原料清理上料工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120902",
                                                "label": "饲料粉碎工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120903",
                                                "label": "饲料配料混合工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120904",
                                                "label": "饲料制粒工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120905",
                                                "label": "饲料添加剂预混工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6120906",
                                                "label": "饲料厂中央控制室操作工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6129901",
                                                "label": "制造工人",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6129902",
                                                "label": "冰块制造工人",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6129903",
                                                "label": "技师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6129904",
                                                "label": "领班、监工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6129905",
                                                "label": "装罐工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "613",
                                    "label": "烟草及其制品加工人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6130101",
                                            "label": "烟叶调制工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6130102",
                                                "label": "烟叶分级工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130103",
                                                "label": "挂杆复烤工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130104",
                                                "label": "打叶复烤工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130105",
                                                "label": "烟叶回潮工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130106",
                                                "label": "烟叶发酵工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130201",
                                                "label": "烟叶制丝工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130202",
                                                "label": "膨胀烟丝工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130203",
                                                "label": "白肋烟处理工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130204",
                                                "label": "烟草薄片工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130205",
                                                "label": "卷烟卷接工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130301",
                                                "label": "烟用二醋片制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130302",
                                                "label": "烟用丝束制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6130303",
                                                "label": "滤棒工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "614",
                                    "label": "药品生产人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6140101",
                                            "label": "化学合成制药工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6140201",
                                                "label": "生化药品制造工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6140202",
                                                "label": "发酵工程制药工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6140203",
                                                "label": "疫苗制品工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6140204",
                                                "label": "血液制品工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6140205",
                                                "label": "基因工程产品工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6140301",
                                                "label": "药物制剂工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6140302",
                                                "label": "淀粉葡萄糖制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6140401",
                                                "label": "中药炮制与配制工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6140402",
                                                "label": "中药液体制剂工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6140403",
                                                "label": "中药固体制剂工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "615",
                                    "label": "木材加工、人造板生产及木材制品制作人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6150102",
                                            "label": "木材干燥工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6150103",
                                                "label": "木材工厂现场之职员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150104",
                                                "label": "领班",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150105",
                                                "label": "分级员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150106",
                                                "label": "检查员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150107",
                                                "label": "标记员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150108",
                                                "label": "磅秤员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150109",
                                                "label": "木材供应站管理人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150110",
                                                "label": "木材供应站营业员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150111",
                                                "label": "仓库管理员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150113",
                                                "label": "木材储藏槽工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150115",
                                                "label": "吊车操作人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150201",
                                                "label": "胶合板工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150205",
                                                "label": "装饰层压板工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150206",
                                                "label": "人造板饰面工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150303",
                                                "label": "精细木工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150304",
                                                "label": "技师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150305",
                                                "label": "领班、监工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6150307",
                                                "label": "木制家具修理工人",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "616",
                                    "label": "制浆、造纸和纸制品生产加工人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6160101",
                                            "label": "制浆备料工",
                                            "occupationType": "5",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6160202",
                                                "label": "纸张整饰工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6160203",
                                                "label": "宣纸书画纸制作工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6160301",
                                                "label": "瓦楞纸箱制作工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6160302",
                                                "label": "纸盒制作工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6169901",
                                                "label": "技师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6169902",
                                                "label": "领班、监工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "617",
                                    "label": "建筑材料生产加工人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6170104",
                                            "label": "工程师",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6170105",
                                                "label": "技师",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6170106",
                                                "label": "领班",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6170110",
                                                "label": "陶瓷、木炭、砖块制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6170201",
                                                "label": "砖、瓦生产工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6170203",
                                                "label": "纸面石膏板生产工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6170204",
                                                "label": "石膏浮雕板工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6170205",
                                                "label": "监工(不参与制造过程)",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "618",
                                    "label": "玻璃、陶瓷、搪瓷及其制品生产加工人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6180101",
                                            "label": "玻璃配料工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6180106",
                                                "label": "技师",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6180107",
                                                "label": "监工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6180401",
                                                "label": "陶瓷原料准备工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6180402",
                                                "label": "陶瓷成型工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6180403",
                                                "label": "陶瓷烧成工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6180404",
                                                "label": "陶瓷装饰工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6180405",
                                                "label": "匣钵、模型制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6180406",
                                                "label": "古建琉璃工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6180501",
                                                "label": "搪瓷釉浆熔制工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6180502",
                                                "label": "搪瓷坯体制作工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6180503",
                                                "label": "搪瓷涂搪烧成工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6180504",
                                                "label": "搪瓷花版饰花工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "619",
                                    "label": "广播影视制品制作、播放及文物保护作业人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6190101",
                                            "label": "影视置景制作员",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6190102",
                                                "label": "影视服装员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190103",
                                                "label": "影视舞台烟火特效员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190104",
                                                "label": "影视动画制作员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190105",
                                                "label": "影视木偶制作员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190106",
                                                "label": "电影洗印员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190201",
                                                "label": "唱片制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190202",
                                                "label": "唱片检听工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190203",
                                                "label": "音像带复制工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190204",
                                                "label": "光盘复制工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190301",
                                                "label": "照明设备操作员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190302",
                                                "label": "影视设备机械员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190304",
                                                "label": "有线广播电视机线员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190305",
                                                "label": "音响调音员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190306",
                                                "label": "舞台音响效果工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190401",
                                                "label": "电影放映员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190402",
                                                "label": "拷贝检片员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190403",
                                                "label": "拷贝字幕员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190404",
                                                "label": "电影院售票员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190405",
                                                "label": "跑片员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190502",
                                                "label": "文物修复工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190503",
                                                "label": "文物拓印工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6190504",
                                                "label": "古旧书画修复工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "620",
                                    "label": "印刷人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6200102",
                                            "label": "凸版制版工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6200103",
                                                "label": "凹版制版工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200104",
                                                "label": "孔版制版工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200105",
                                                "label": "印前制作员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200101",
                                                "label": "平版制版工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200201",
                                                "label": "平版印刷工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200202",
                                                "label": "凸版印刷工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200203",
                                                "label": "凹版印刷工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200204",
                                                "label": "孔版 印刷工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200205",
                                                "label": "木刻水印印制工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200206",
                                                "label": "珂罗版印制工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200207",
                                                "label": "盲文印制工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200301",
                                                "label": "装订工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6200302",
                                                "label": "印品整饰工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "621",
                                    "label": "工艺、美术品制作人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6210101",
                                            "label": "宝石琢磨工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6210102",
                                                "label": "贵金属首饰制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210201",
                                                "label": "地毯制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210301",
                                                "label": "金属、塑料、木制玩具装配工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210302",
                                                "label": "布绒玩具制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210303",
                                                "label": "搪塑玩具制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210401",
                                                "label": "漆器制胎工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210402",
                                                "label": "彩绘雕填制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210403",
                                                "label": "漆器镶嵌工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210501",
                                                "label": "机绣工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210502",
                                                "label": "手绣制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210503",
                                                "label": "抽纱挑编工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210601",
                                                "label": "景泰蓝制作工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210602",
                                                "label": "金属摆件工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210603",
                                                "label": "金属手工艺品加工工人",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210701",
                                                "label": "金属工艺品雕刻工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210702",
                                                "label": "竹木制手工艺品雕刻工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210801",
                                                "label": "装饰美工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210802",
                                                "label": "雕塑翻制工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210803",
                                                "label": "壁画制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210804",
                                                "label": "油画外框制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210805",
                                                "label": "装裱工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6210806",
                                                "label": "版画制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6219901",
                                                "label": "民间工艺品制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6219902",
                                                "label": "人造花制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6219903",
                                                "label": "工艺画制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6219905",
                                                "label": "竹木制手工艺品加工工人",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6219906",
                                                "label": "布类纸品工艺品加工工人",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6219907",
                                                "label": "矿石手工艺品加工人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "622",
                                    "label": "文化教育、体育用品制作人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6220101",
                                            "label": "墨制作工",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6220102",
                                                "label": "墨水制造工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220103",
                                                "label": "墨汁制造工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220104",
                                                "label": "绘图仪器制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220105",
                                                "label": "静电复印机消耗材制造工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220106",
                                                "label": "毛笔制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220107",
                                                "label": "自来水笔制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220108",
                                                "label": "圆珠笔制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220109",
                                                "label": "铅笔制造工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220110",
                                                "label": "印泥制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220201",
                                                "label": "制球工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220202",
                                                "label": "球拍、球网制作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220203",
                                                "label": "健身器材制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220301",
                                                "label": "钢琴及键盘乐器制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220302",
                                                "label": "提琴制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220303",
                                                "label": "管乐器制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220304",
                                                "label": "民族拉弦、弹拨乐器制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220305",
                                                "label": "吹奏乐器制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220306",
                                                "label": "打击乐器制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6220307",
                                                "label": "电声乐器制作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "623",
                                    "label": "工程施工人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6230201",
                                            "label": "砌筑工",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6230202",
                                                "label": "洗石工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230203",
                                                "label": "砌砖匠",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230204",
                                                "label": "泥水匠",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230205",
                                                "label": "磨石工人",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230301",
                                                "label": "混凝土工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230302",
                                                "label": "混凝土制品模具工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230303",
                                                "label": "混凝土搅拌机械操作工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230601",
                                                "label": "防水工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230602",
                                                "label": "防渗墙工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230603",
                                                "label": "排水工程人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230701",
                                                "label": "装饰装修工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230702",
                                                "label": "室内成套设施装饰工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230704",
                                                "label": "铝门窗安装工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230705",
                                                "label": "石棉瓦或浪板安装工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230706",
                                                "label": "设计制图人员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230707",
                                                "label": "地毯之装设人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230708",
                                                "label": "室内装潢人员(不含木工、油漆工)",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230710",
                                                "label": "承包商、监工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230802",
                                                "label": "古建筑装饰工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230901",
                                                "label": "筑路机械操作工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230902",
                                                "label": "筑路、养护工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230903",
                                                "label": "线桥专用机械操作工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230908",
                                                "label": "道岔制修工",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230909",
                                                "label": "枕木处理工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230910",
                                                "label": "铁路平交道看守人员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230911",
                                                "label": "铁路修护厂技工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230912",
                                                "label": "铁路铺设领班",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6230913",
                                                "label": "管道铺设及维护工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6231001",
                                                "label": "机械设备安装工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6231002",
                                                "label": "电气设备安装工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6231003",
                                                "label": "管工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6231004",
                                                "label": "防火系统、警报器安装人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6231007",
                                                "label": "电梯、升降机修理及维护工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6239901",
                                                "label": "中小型施工机械操作工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6239902",
                                                "label": "建筑工程车辆驾驶员",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6239903",
                                                "label": "建筑工程车辆机械操作员",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6239904",
                                                "label": "监工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6239905",
                                                "label": "测量员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6239907",
                                                "label": "道路工程机械操作员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6239908",
                                                "label": "道路工程车辆驾驶员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6239909",
                                                "label": "工地看守员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6239914",
                                                "label": "工地推车工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "624",
                                    "label": "运输设备操作人员及有关人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6240101",
                                            "label": "自用小客车司机",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6240102",
                                                "label": "自用大客车司机",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240103",
                                                "label": "出租车、救护车司机",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240104",
                                                "label": "游览车司机及服务员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240105",
                                                "label": "客运车司机及服务员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240106",
                                                "label": "小型客货两用车司机",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240107",
                                                "label": "自用货车司机、随车工人、搬家工人",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240109",
                                                "label": "机动三轮车夫",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240110",
                                                "label": "营业用货车司机、随车工人",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240111",
                                                "label": "砂石车司机、随车工人",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240112",
                                                "label": "工程卡车司机、随车人员",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240113",
                                                "label": "液化、氧化油罐车司机、随车工人",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240114",
                                                "label": "货柜车司机、随车人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240115",
                                                "label": "有摩托车驾照人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240201",
                                                "label": "车站行车作业员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240202",
                                                "label": "车站运转作业计划员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240203",
                                                "label": "车号员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240204",
                                                "label": "驼峰设备操作员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240205",
                                                "label": "车站调车作业员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240206",
                                                "label": "列车运转乘务员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240207",
                                                "label": "机车驾驶员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240208",
                                                "label": "机车调度员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240209",
                                                "label": "发电车乘务员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240210",
                                                "label": "机车燃料填充员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240211",
                                                "label": "救援机械操作员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240212",
                                                "label": "列车轴温检测员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240213",
                                                "label": "铁路通信工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240214",
                                                "label": "铁路电源工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240215",
                                                "label": "铁路信号工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240216",
                                                "label": "铁路机工",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240301",
                                                "label": "航空通信雷达导航员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240302",
                                                "label": "航空通信雷达设备维护保养员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240303",
                                                "label": "航空油料员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240305",
                                                "label": "航空器材员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240306",
                                                "label": "航空气象员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240401",
                                                "label": "水手长、水手",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240402",
                                                "label": "木匠",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240403",
                                                "label": "铜匠",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240404",
                                                "label": "船舶机工",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240405",
                                                "label": "船舶轮机员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240406",
                                                "label": "船舶加油",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240407",
                                                "label": "无线电航标操作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240410",
                                                "label": "港口维护工(码头维修、水面防污、港口除尘)",
                                                "occupationType": "5",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240412",
                                                "label": "泵匠",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240413",
                                                "label": "电机师",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240414",
                                                "label": "游览船之驾驶及工作人员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240415",
                                                "label": "小汽艇之驾驶及工作人员",
                                                "occupationType": "6",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240416",
                                                "label": "拖船驾驶员及工作人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240417",
                                                "label": "渡船驾驶员及工作人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240503",
                                                "label": "输送机操作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240504",
                                                "label": "闸门运行工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6240505",
                                                "label": "索道运输机械操作工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6249901",
                                                "label": "电梯、升降机操作员(不含矿场使用者)",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "625",
                                    "label": "环境监测与废物处理人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6250101",
                                            "label": "大气环境监测工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6250102",
                                                "label": "水环境监测工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250103",
                                                "label": "土壤环境监测工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250104",
                                                "label": "环境生物监测工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250105",
                                                "label": "环境噪声及振动监测工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250106",
                                                "label": "固体废物监测工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250107",
                                                "label": "环境辐射监测工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250108",
                                                "label": "室内装饰装修质量检验员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250109",
                                                "label": "室内环境治理员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250201",
                                                "label": "海洋调查与监测工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250202",
                                                "label": "海洋浮标工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250203",
                                                "label": "海洋水文气象观测员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250301",
                                                "label": "固体废物处理工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250302",
                                                "label": "废水处理工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250303",
                                                "label": "废气处理工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6250304",
                                                "label": "除尘设备运行工",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "626",
                                    "label": "检验、计量人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6260101",
                                            "label": "化学检验工",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6260102",
                                                "label": "材料成分检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260103",
                                                "label": "材料物理性能检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260104",
                                                "label": "无损检测员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260105",
                                                "label": "产品环境适应性能检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260106",
                                                "label": "产品可靠性能检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260107",
                                                "label": "产品安全性能检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260108",
                                                "label": "食品检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260109",
                                                "label": "饲料检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260110",
                                                "label": "畜禽产品检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260111",
                                                "label": "烟草检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260112",
                                                "label": "纺织纤维检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260113",
                                                "label": "针纺织品检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260114",
                                                "label": "印染工艺检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260115",
                                                "label": "服装鞋帽检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260116",
                                                "label": "木材及家具检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260117",
                                                "label": "包装材料检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260118",
                                                "label": "文体用品及出版物品检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260119",
                                                "label": "燃料检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260120",
                                                "label": "感光材料检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260121",
                                                "label": "药物检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260122",
                                                "label": "中药检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260123",
                                                "label": "五金制品检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260124",
                                                "label": "机械产品检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260125",
                                                "label": "医疗器械检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260126",
                                                "label": "机动车检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260127",
                                                "label": "电器产品检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260128",
                                                "label": "电工器材检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260129",
                                                "label": "照明电器检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260130",
                                                "label": "通信设备检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260131",
                                                "label": "广播影视设备检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260132",
                                                "label": "计算机检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260133",
                                                "label": "电子器件检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260134",
                                                "label": "仪器仪表检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260135",
                                                "label": "贵金属首饰、钻石、宝玉石检验员",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260136",
                                                "label": "管道检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260137",
                                                "label": "合成材料测试员",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260201",
                                                "label": "飞机检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260202",
                                                "label": "机载导弹检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260203",
                                                "label": "航空发动机检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260204",
                                                "label": "飞机螺旋桨检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260205",
                                                "label": "飞机、发动机附检验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260206",
                                                "label": "航空环控救生装备检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260207",
                                                "label": "航空仪表检验工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260301",
                                                "label": "航天器无损检测试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260302",
                                                "label": "航天器材料性能测试试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260303",
                                                "label": "试车台测量工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260304",
                                                "label": "试车台液、气系统操作工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260305",
                                                "label": "试车台控制工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260306",
                                                "label": "液体推进剂性能试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260307",
                                                "label": "固体推进剂性能试验工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260308",
                                                "label": "试车台测力计量检定工",
                                                "occupationType": "2",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260401",
                                                "label": "长度计量工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260402",
                                                "label": "热工计量工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260403",
                                                "label": "衡器计量工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260404",
                                                "label": "硬度测力计量工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260405",
                                                "label": "容量计量工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260406",
                                                "label": "电器计量工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260407",
                                                "label": "化学计量工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260408",
                                                "label": "声学计量工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260409",
                                                "label": "光学计量工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260410",
                                                "label": "电离辐射计量工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6260411",
                                                "label": "专用计量器具计量工",
                                                "occupationType": "1",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                },
                                {
                                    "value": "699",
                                    "label": "其他生产运输设备操作人员及有关人员",
                                    "children": {
                                        "name": "block1",
                                        "label": "",
                                        "options": [{
                                            "value": "6990101",
                                            "label": "包装人员",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                            {
                                                "value": "6990201",
                                                "label": "机泵操作人员",
                                                "occupationType": "3",
                                                "hospitalRisk": "1"
                                            },
                                            {
                                                "value": "6990301",
                                                "label": "简单体力劳动人员",
                                                "occupationType": "4",
                                                "hospitalRisk": "1"
                                            }]
                                    }
                                }]
                        }
                    },
                    {
                        "value": "7",
                        "label": "军人",
                        "children": {
                            "name": "job1",
                            "label": "请选择",
                            "options": [{
                                "value": "700",
                                "label": "军人",
                                "children": {
                                    "name": "block1",
                                    "label": "",
                                    "options": [{
                                        "value": "7000001",
                                        "label": "一般地面部队人员(含陆军野战、机械修护、土木工程、飞弹、战车及空军炮、飞机修护等)",
                                        "occupationType": "3",
                                        "hospitalRisk": "1"
                                    },
                                        {
                                            "value": "7000003",
                                            "label": "行政及内勤人员(国防部、三军总部、军校教官等)",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "7000004",
                                            "label": "宪兵",
                                            "occupationType": "4",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "7000005",
                                            "label": "后勤补给及通讯地勤人员",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "7000006",
                                            "label": "军事研究单位纸上设计人员",
                                            "occupationType": "1",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "7000007",
                                            "label": "军事单位武器、弹药研究及管理人员",
                                            "occupationType": "3",
                                            "hospitalRisk": "1"
                                        },
                                        {
                                            "value": "7000011",
                                            "label": "军医院官兵",
                                            "occupationType": "2",
                                            "hospitalRisk": "1"
                                        }]
                                }
                            }]
                        }
                    },
                    {
                        "value": "800",
                        "label": "其他从业人员",
                        "children": {
                            "name": "block1",
                            "label": "",
                            "options": [{
                                "value": "8000001",
                                "label": "无业人员",
                                "occupationType": "2",
                                "hospitalRisk": "1"
                            },
                                {
                                    "value": "8000002",
                                    "label": "退休人员",
                                    "occupationType": "1",
                                    "hospitalRisk": "1"
                                },
                                {
                                    "value": "8000003",
                                    "label": "离休人员",
                                    "occupationType": "1",
                                    "hospitalRisk": "1"
                                },
                            ]
                        }
                    }]
            }
        }]
}
export default jobs
