(function () {
    document.addEventListener('DOMContentLoaded', () => {
        ensureFavicon();
        ensureMessagesNav();
        ensureSiteSearch();
        initHomeTraffic();
        initSiteClock();
        initResearchPicker();
        initSiteSearch();
        initQuoteDrawer();
        initMessageBottle();
    });

    function getRootPrefix() {
        const script = Array.from(document.scripts).find((item) => {
            return (item.getAttribute('src') || '').includes('assets/js/site-interactions.js');
        });
        if (!script) {
            return '';
        }

        const path = script.getAttribute('src') || '';
        const index = path.lastIndexOf('assets/js/site-interactions.js');
        return index === -1 ? '' : path.slice(0, index);
    }

    function ensureMessagesNav() {
        const navList = document.querySelector('#nav ul');
        if (!navList || navList.querySelector('a[href$="messages.html"]')) {
            return;
        }

        const rootPrefix = getRootPrefix();
        const aboutLink = Array.from(navList.querySelectorAll('a')).find((link) => {
            return (link.getAttribute('href') || '').includes('about.html');
        });
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `${rootPrefix}pages/messages.html`;
        link.textContent = '访客留言';

        const isMessagesPage = window.location.pathname.replace(/\\/g, '/').endsWith('/pages/messages.html');
        if (isMessagesPage) {
            navList.querySelectorAll('a.active').forEach((activeLink) => activeLink.classList.remove('active'));
            link.classList.add('active');
        }

        item.appendChild(link);
        if (aboutLink && aboutLink.parentElement) {
            navList.insertBefore(item, aboutLink.parentElement);
        } else {
            navList.appendChild(item);
        }
    }

    function ensureFavicon() {
        const rootPrefix = getRootPrefix();
        const href = `${rootPrefix}assets/images/favicon.svg?v=mk-text-blue`;
        let icon = document.querySelector('link[rel="icon"]');

        if (!icon) {
            icon = document.createElement('link');
            icon.rel = 'icon';
            document.head.appendChild(icon);
        }

        icon.type = 'image/svg+xml';
        icon.href = href;
    }

    function ensureSiteSearch() {
        if (document.getElementById('site-search-input')) {
            return;
        }

        const main = document.querySelector('.main');
        if (!main) {
            return;
        }

        const panel = document.createElement('section');
        panel.className = 'interactive-panel site-search global-site-search';
        panel.innerHTML = `
            <h2>站内搜索</h2>
            <div class="search-main">
                <div class="search-box">
                    <input id="site-search-input" type="search" placeholder="搜索：计算机视觉、大模型、强化学习、人脸……" autocomplete="off">
                    <div class="search-results" id="site-search-results"></div>
                </div>
                <section class="home-discovery">
                    <a class="picker-result" id="picker-result" href="pages/interests.html">研究兴趣</a>
                </section>
            </div>
            <div class="search-dashboard">
                <div class="traffic-clock" aria-label="当前时间">
                    <span>当前时间</span>
                    <strong id="site-clock">--:--:--</strong>
                </div>
                <section class="home-traffic" aria-label="站点浏览量">
                    <div class="traffic-card">
                        <span>总浏览量</span>
                        <strong>9999+</strong>
                    </div>
                    <div class="traffic-card">
                        <span>今日浏览量</span>
                        <strong id="recent-views">--</strong>
                    </div>
                </section>

            </div>
        `;
        main.insertBefore(panel, main.firstElementChild);
    }

    function initHomeTraffic() {
        const recent = document.getElementById('recent-views');
        if (!recent) {
            return;
        }

        const key = 'meikongTodayViews';
        const now = new Date();
        const today = [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0')
        ].join('-');
        const countedKey = `${key}Counted:${today}`;
        const saved = JSON.parse(localStorage.getItem(key) || '{}');
        const current = saved.date === today && Number.isFinite(Number(saved.count))
            ? Number(saved.count)
            : Math.floor(Math.random() * 101);

        const hasCountedThisSession = sessionStorage.getItem(countedKey) === '1';
        const next = hasCountedThisSession ? current : current + 1;

        localStorage.setItem(key, JSON.stringify({
            date: today,
            count: next
        }));
        sessionStorage.setItem(countedKey, '1');
        recent.textContent = String(next).padStart(4, '0');
    }

    function initSiteClock() {
        const clock = document.getElementById('site-clock');
        if (!clock) {
            return;
        }

        function updateClock() {
            const now = new Date();
            const date = [
                now.getFullYear(),
                String(now.getMonth() + 1).padStart(2, '0'),
                String(now.getDate()).padStart(2, '0')
            ].join('.');
            const time = [
                String(now.getHours()).padStart(2, '0'),
                String(now.getMinutes()).padStart(2, '0'),
                String(now.getSeconds()).padStart(2, '0')
            ].join(':');
            clock.textContent = `${date} ${time}`;
        }

        updateClock();
        setInterval(updateClock, 1000);
    }

    function initResearchPicker() {
        const panel = document.querySelector('.home-discovery');
        const result = document.getElementById('picker-result');
        if (!panel || !result) {
            return;
        }

        const rootPrefix = getRootPrefix();
        const options = [
            { label: '悟语心笺 - 写在开始', href: 'posts/thoughts/thought-1.html' },
            { label: '悟语心笺 - 我真的很幸运', href: 'posts/thoughts/thought-2.html' },
            { label: '后门攻防 - BadNets', href: 'research/backdoor/attack/BadNets.html' },
            { label: '后门攻防 - WaNet', href: 'research/backdoor/attack/WaNet.html' },
            { label: '后门攻防 - LIRA', href: 'research/backdoor/attack/LIRA.html' },
            { label: '后门攻防 - IRBA', href: 'research/backdoor/attack/IRBA.html' },
            { label: '后门防御 - Neural Cleanse', href: 'research/backdoor/defense/Neural-Cleanse.html' },
            { label: '后门防御 - Fine-Pruning', href: 'research/backdoor/defense/Fine-Pruning.html' },
            { label: '科研工具 - 文献获取与管理', href: 'science/1-wenxian.html' },
            { label: '科研工具 - Docker 与服务器', href: 'science/1-docker.html' },
            { label: '科研工具 - Ubuntu 基础', href: 'science/1-ubuntu.html' },
            { label: '科研工具 - 快捷命令汇总', href: 'science/1-shortcut.html' }
        ];

        function pickRandom() {
            return options[Math.floor(Math.random() * options.length)];
        }

        function updateResult(label, href, prefix) {
            result.href = `${rootPrefix}${href}`;
            result.innerHTML = `<span>${prefix}</span><strong>${label}</strong>`;
            result.classList.remove('is-ready');
            requestAnimationFrame(() => result.classList.add('is-ready'));
        }

        panel.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', () => {
                let href = button.dataset.target;
                let label = button.textContent;

                if (button.dataset.random) {
                    const picked = pickRandom();
                    href = picked.href;
                    label = picked.label;
                }

                updateResult(label, href, button.dataset.random ? '随机推荐' : '去看看');
            });
        });

        const today = new Date().toISOString().slice(0, 10);
        const recommendationKey = 'meikongDailyRecommendation';
        const savedRecommendation = JSON.parse(localStorage.getItem(recommendationKey) || '{}');
        const savedStillAvailable = options.some((option) => {
            return option.href === savedRecommendation.href && option.label === savedRecommendation.label;
        });
        const initial = savedRecommendation.date === today && savedRecommendation.href && savedRecommendation.label && savedStillAvailable
            ? { label: savedRecommendation.label, href: savedRecommendation.href }
            : pickRandom();

        if (savedRecommendation.date !== today || !savedRecommendation.href || !savedRecommendation.label || !savedStillAvailable) {
            localStorage.setItem(recommendationKey, JSON.stringify({
                date: today,
                label: initial.label,
                href: initial.href
            }));
        }
        updateResult(initial.label, initial.href, '今日推荐');
    }

    function initSiteSearch() {
        const input = document.getElementById('site-search-input');
        const results = document.getElementById('site-search-results');
        if (!input || !results) {
            return;
        }

        let activeIndex = -1;
        const rootPrefix = getRootPrefix();
        const entries = [
            { title: '实用干货', href: 'pages/science.html', tags: '科研 工具 AI 文献 写作 Docker Ubuntu Zotero 小绿鲸' },
            { title: '研究兴趣', href: 'pages/interests.html', tags: '研究 方向 兴趣 后门攻击 防御' },
            { title: '后门攻击与防御', href: 'research/backdoor/index.html', tags: '后门 攻击 防御 轮播 样本' },
            { title: '攻击方法', href: 'research/backdoor/attack/index.html', tags: '攻击 方法 BadNets Blend WaNet LIRA Refool Rotation' },
            { title: 'IRBA', href: 'research/backdoor/attack/IRBA.html', tags: 'IRBA 点云 3D Point Cloud 后门 攻击 WLT 鲁棒 不可感知' },
            { title: '防御方法', href: 'research/backdoor/defense/index.html', tags: '防御 方法 Fine-Pruning STRIP Neural Cleanse Grad-CAM' },
            { title: '实用AI', href: 'science/1-AI.html', tags: 'AI 科研 辅助 工具' },
            { title: '文献的获取、管理与阅读', href: 'science/1-wenxian.html', tags: '文献 arXiv Google Scholar Zotero 小绿鲸' },
            { title: '文章写作与文档编辑', href: 'science/1-xiezuo.html', tags: '写作 文档 编辑 论文' },
            { title: '实用工具', href: 'science/1-gongju.html', tags: '工具 科研 学习' },
            { title: '工程资源获取', href: 'science/1-ziyuan.html', tags: '工程 资源 代码 数据集' },
            { title: '快捷命令汇总', href: 'science/1-shortcut.html', tags: '快捷 命令 实验' },
            { title: 'Ubuntu基础', href: 'science/1-ubuntu.html', tags: 'Ubuntu Linux 系统 环境' },
            { title: 'Portainer、Docker与服务器搭建', href: 'science/1-docker.html', tags: 'Docker Portainer 服务器 部署' },
            { title: '悟语心笺', href: 'pages/thoughts.html', tags: '悟语 心得 记录 思考' },
            { title: '写在开始', href: 'posts/thoughts/thought-1.html', tags: '开始 思考 记录 未来 自己' },
            { title: '我真的很幸运', href: 'posts/thoughts/thought-2.html', tags: '幸运 悟语 心得' },
            { title: '关于作者', href: 'pages/about.html', tags: '关于 作者 支持 留言瓶 对话' }
        ];

        const aboutEntryIndex = entries.findIndex((entry) => entry.href === 'pages/about.html');
        entries.splice(aboutEntryIndex >= 0 ? aboutEntryIndex : entries.length, 0, {
            title: '访客留言',
            href: 'pages/messages.html',
            tags: '留言 留言瓶 访客 互动 点赞'
        });

        function render(query) {
            const keyword = query.trim().toLowerCase();
            results.innerHTML = '';
            activeIndex = -1;

            if (!keyword) {
                return;
            }

            const matched = entries.filter((entry) => {
                return `${entry.title} ${entry.tags}`.toLowerCase().includes(keyword);
            }).slice(0, 8);

            if (matched.length === 0) {
                results.innerHTML = '<p class="search-empty">没有找到相关内容，换个关键词试试。</p>';
                return;
            }

            matched.forEach((entry) => {
                const link = document.createElement('a');
                link.href = `${rootPrefix}${entry.href}`;
                link.textContent = entry.title;
                link.tabIndex = -1;
                results.appendChild(link);
            });
        }

        function getResultLinks() {
            return Array.from(results.querySelectorAll('a'));
        }

        function setActiveResult(nextIndex) {
            const links = getResultLinks();
            if (links.length === 0) {
                activeIndex = -1;
                return;
            }

            activeIndex = (nextIndex + links.length) % links.length;
            links.forEach((link, index) => {
                link.classList.toggle('is-active', index === activeIndex);
            });
            links[activeIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest'
            });
        }

        input.addEventListener('input', () => render(input.value));
        input.addEventListener('keydown', (event) => {
            const links = getResultLinks();

            if (event.key === 'ArrowDown') {
                if (links.length === 0) {
                    return;
                }
                event.preventDefault();
                setActiveResult(activeIndex + 1);
                return;
            }

            if (event.key === 'ArrowUp') {
                if (links.length === 0) {
                    return;
                }
                event.preventDefault();
                setActiveResult(activeIndex - 1);
                return;
            }

            if (event.key === 'Enter') {
                if (links.length === 0) {
                    return;
                }
                event.preventDefault();
                const target = links[activeIndex >= 0 ? activeIndex : 0];
                target.click();
                return;
            }

            if (event.key === 'Escape') {
                input.value = '';
                render('');
                input.blur();
            }
        });

        document.addEventListener('click', (event) => {
            if (event.target === input || results.contains(event.target)) {
                return;
            }
            render('');
        });
        render('');
    }

    function initQuoteDrawer() {
        const quote = document.getElementById('daily-quote');
        const button = document.getElementById('draw-quote');
        if (!quote || !button) {
            return;
        }

        const quotes = [
            '最好的倾听者，竟是未来的自己。',
            '记录不是为了立刻被看见，而是为了让未来还有路可回望。',
            '每一次整理，都是把混乱慢慢变成可以继续前进的地图。',
            '也许某一天，某个有缘人会在这里短暂停留。',
            '思想的火花可以在时光的隧道中传递。'
        ];

        button.addEventListener('click', () => {
            const picked = quotes[Math.floor(Math.random() * quotes.length)];
            quote.textContent = picked;
            quote.classList.remove('quote-pop');
            requestAnimationFrame(() => quote.classList.add('quote-pop'));
        });
    }

    function initMessageBottle() {
        const input = document.getElementById('bottle-input');
        const submit = document.getElementById('bottle-submit');
        const clear = document.getElementById('bottle-clear');
        const list = document.getElementById('bottle-list');
        if (!input || !submit || !clear || !list) {
            return;
        }

        const bottleKey = 'meikongMessageBottle';
        const sampleLikeKey = 'meikongBottleSampleLikes';
        const samplePool = [
            '路过这里，感觉像看到了一本慢慢长大的科研手账。',
            '谢谢整理这些资料，刚入门的时候真的很需要这样的入口。',
            '希望这个 Blog 一直更新下去，也希望未来的我能更勇敢一点。',
            '看到“写给未来的自己”那段话，有一点被安慰到。',
            '愿每一个认真记录的人，都能在某天被自己的坚持照亮。',
            '后门攻击这一块整理得很清楚，适合反复回来查。',
            '今天也在努力读论文，希望下次再来能多懂一点。',
            '被“未来的自己”这几个字击中了。',
            '科研路很长，但有人把路标写出来就会好走很多。',
            '希望所有初学者都能少一点孤独，多一点方向。',
            '这个站像一个小小的资料港口，停靠一下再出发。',
            '谢谢你把踩过的坑写下来。',
            '愿后来的人能在这里找到自己的第一束光。',
            '收藏了，等配环境崩溃的时候回来看看。',
            '如果某天我也做了自己的 Blog，希望也能这样认真。'
        ];
        let sampleOffset = Number(localStorage.getItem('meikongBottleSampleOffset') || '0');
        if (!Number.isFinite(sampleOffset)) {
            sampleOffset = 0;
        }
        let sampleLikes = JSON.parse(localStorage.getItem(sampleLikeKey) || '{}');
        let messages = normalizeMessages(JSON.parse(localStorage.getItem(bottleKey) || '[]'));

        function normalizeMessages(rawMessages) {
            return rawMessages.map((message, index) => {
                if (typeof message === 'string') {
                    const createdAt = Date.now() + index;
                    return {
                        text: message,
                        createdAt,
                        likes: getInitialLikes(message, createdAt)
                    };
                }

                return {
                    ...message,
                    createdAt: message.createdAt || Date.now() + index,
                    likes: Number.isFinite(Number(message.likes))
                        ? Number(message.likes)
                        : getInitialLikes(message.text, message.createdAt || index)
                };
            }).filter((message) => message && message.text);
        }

        function saveMessages() {
            localStorage.setItem(bottleKey, JSON.stringify(messages));
        }

        function saveSampleLikes() {
            localStorage.setItem(sampleLikeKey, JSON.stringify(sampleLikes));
        }

        function getInitialLikes(text, salt) {
            const seed = `${text}-${salt}`;
            let hash = 0;
            for (let index = 0; index < seed.length; index += 1) {
                hash = ((hash << 5) - hash) + seed.charCodeAt(index);
                hash |= 0;
            }

            return 8 + (Math.abs(hash) % 92);
        }

        function createLikeButton(count, onClick) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'bottle-like';
            button.setAttribute('aria-label', `点赞 ${count}`);
            button.innerHTML = `<span aria-hidden="true">👍</span><strong>${count}</strong>`;
            button.addEventListener('click', (event) => {
                const bubble = document.createElement('i');
                bubble.className = 'like-bubble';
                bubble.textContent = '+1';
                bubble.style.left = `${event.clientX}px`;
                bubble.style.top = `${event.clientY}px`;
                document.body.appendChild(bubble);
                bubble.addEventListener('animationend', () => bubble.remove(), { once: true });
                onClick();
            });
            return button;
        }

        function renderMessages() {
            list.innerHTML = '';

            const visibleSamples = Array.from({ length: 5 }, (_, index) => {
                return samplePool[(sampleOffset + index) % samplePool.length];
            });
            const status = document.createElement('div');
            status.className = 'bottle-status';
            const statusText = document.createElement('span');
            statusText.textContent = '访客留言正在漂流中，剩余 99+ 条未展示';
            const refresh = document.createElement('button');
            refresh.type = 'button';
            refresh.textContent = '刷新';
            refresh.addEventListener('click', () => {
                sampleOffset = (sampleOffset + 1) % samplePool.length;
                localStorage.setItem('meikongBottleSampleOffset', String(sampleOffset));
                renderMessages();
            });
            status.appendChild(statusText);
            status.appendChild(refresh);
            list.appendChild(status);

            visibleSamples.forEach((message) => {
                const sampleIndex = samplePool.indexOf(message);
                const sampleKey = `sample-${sampleIndex}`;
                const likes = Number.isFinite(Number(sampleLikes[sampleKey]))
                    ? Number(sampleLikes[sampleKey])
                    : getInitialLikes(message, sampleIndex);
                const item = document.createElement('div');
                item.className = 'bottle-message sample-message';

                const text = document.createElement('span');
                text.textContent = message;

                const tools = document.createElement('div');
                tools.className = 'bottle-message-tools';

                const like = createLikeButton(likes, () => {
                    sampleLikes[sampleKey] = likes + 1;
                    saveSampleLikes();
                    renderMessages();
                });

                tools.appendChild(like);
                item.appendChild(text);
                item.appendChild(tools);
                list.appendChild(item);
            });

            messages.slice().reverse().forEach((message) => {
                const item = document.createElement('div');
                item.className = 'bottle-message user-message';

                const text = document.createElement('span');
                text.textContent = message.text;

                const tools = document.createElement('div');
                tools.className = 'bottle-message-tools';

                const like = createLikeButton(message.likes || 0, () => {
                    message.likes = (message.likes || 0) + 1;
                    saveMessages();
                    renderMessages();
                });

                const remove = document.createElement('button');
                remove.type = 'button';
                remove.className = 'bottle-delete';
                remove.textContent = '删除';
                remove.addEventListener('click', () => {
                    messages = messages.filter((savedMessage) => savedMessage.createdAt !== message.createdAt);
                    saveMessages();
                    renderMessages();
                });

                tools.appendChild(like);
                tools.appendChild(remove);
                item.appendChild(text);
                item.appendChild(tools);
                list.appendChild(item);
            });
        }

        submit.addEventListener('click', () => {
            const value = input.value.trim();
            if (!value) {
                input.focus();
                return;
            }

            messages.push({
                text: value,
                createdAt: Date.now(),
                likes: 0
            });
            messages = messages.slice(-6);
            saveMessages();
            input.value = '';
            renderMessages();
        });

        clear.addEventListener('click', () => {
            messages = [];
            saveMessages();
            renderMessages();
        });

        renderMessages();
    }
})();
