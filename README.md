# LogiKit（OneCargoKit 复刻项目）

对标 onecargokit.com 架构的全量复刻站。**抄架构，不抄内容**——所有文案、设计、代码均为原创，仅复刻其"静态站 + ETL + 免费API + 深链接"的架构模式。

## 目录结构

```
onecargokit-clone/
├── index.html              # 工具中心导航页（对标首页工具矩阵）
├── tools/                  # 每个工具一个独立 HTML（对标 93 个工具页）
│   └── charge-weight.html  # ✅ 第一个工具：计费重计算（纯前端）
├── assets/
│   ├── css/style.css       # 全站统一样式
│   └── js/nav.js           # 统一导航+页脚+语言参数（对标 ock-nav.js）
├── data/                   # ETL 产物静态数据文件（对标 data/*.js）
├── etl/
│   └── etl_template.py     # 数据管线模板（对标 etl_hs_data.py）
└── README.md
```

## 快速开始

```bash
# 本地预览（任选其一）
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000

# 跑数据管线
python3 etl/etl_template.py          # 全部管线
python3 etl/etl_template.py forex    # 只跑汇率
```

## 新增一个工具的标准流程（10分钟）

1. 复制 `tools/charge-weight.html` 改名
2. 替换标题/描述/表单/计算逻辑
3. 在 `index.html` 对应分类的 tool-grid 里加一张卡片
4. 若需数据：在 `etl/etl_template.py` 注册管线 → 跑一次 → `tools/xx.html` 里 `<script src="../data/XX.js">`
5. 若是官方数据查询类：**不做爬虫，直接深链接跳官网**（对标其 EORI/运单追踪模式）

## 部署（零成本）

- **方案A Cloudflare Pages**（推荐，同原站）：GitHub 仓库连 Cloudflare Pages，push 即部署，免费送 `xxx.pages.dev` 子域名；后续要 Serverless 代理（航班雷达类）也在此
- **方案B GitHub Pages**：仓库 Settings → Pages → main 分支，免费

## 工具铺量路线（按零数据成本优先排序）

| 批次 | 工具 | 数据成本 |
|---|---|---|
| 第1批（纯前端公式） | 计费重✅、体积换算、单位换算、VAT计算、利润计算、Incoterms参考、滞港费 | 0 |
| 第2批（一次性ETL） | 机场三字码(OurAirports开源)、航司代码、ULD规格、物流术语、包装尺寸参考 | 0 |
| 第3批（免费API） | 汇率(frankfurter.dev)、时区转换 | 0 |
| 第4批（深链接） | 运单追踪(航司前缀→官网)、EORI验证(跳欧盟官网)、商标查询(跳官方) | 0 |
| 第5批（重数据ETL） | 中国HS查询、出口退税率、日本关税(已有5611条！)、RCEP/FTA税率对比 | 数据整理为主 |
| 第6批（Serverless） | 航班雷达(Cloudflare Function代理免费ADS-B API) | 0 |
| 第7批（AI） | 物流AI助手（LLM网关，鉴权+限流） | 按量 |

## 合规红线

- 抄架构不抄内容：原站文案/图标/设计资产不直接搬
- 所有数据型工具页脚必须标注数据来源与版本日期（`ockSetSource()` 已封装）
- 官方权威数据一律深链接，不做实时爬取
- HS/退税率每年更新，ETL 管线里写明数据版本
