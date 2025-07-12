---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: home
list_title: "En directe de mon blog"
---
{% include hero.html %}
{% include services.html %}
{% include works.html %}

{% include work-modal.html %}

<!-- GSAP Scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<!-- Custom Scripts -->
<script src="{{ '/assets/js/works.js' | relative_url }}"></script>
<script src="{{ '/assets/js/scroll-animations.js' | relative_url }}"></script>