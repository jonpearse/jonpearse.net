import { BlueSky, EnvelopeFilled, Github, Mastodon } from './icons';

export const Footer = () => (
	<footer class="container flex -distribute | footer">
		<p>
			Jon Pearse, <abbr title="2026">MMXXVI</abbr>
		</p>

		<nav>
			<h2 class="a11y">Find me elsewhere</h2>

			<ul class="flex plain">
				<li>
					<a href="mailto:hello@jonpearse.net">
						<EnvelopeFilled title="Send me an email" />
					</a>
				</li>
				<li>
					<a href="https://front-end.social/@jonpearse" rel="me" style="--brand: #6364ff">
						<Mastodon title="Mastodon: @jonpearse@front-end.social" />
					</a>
				</li>
				<li>
					<a href="https://bsky.app/profile/jonpearse.net" style="--brand: #1185fe">
						<BlueSky title="BlueSky: @jonpearse.net" />
					</a>
				</li>
				<li>
					<a href="https://github.com/jonpearse" style="--brand:#0FBF3E">
						<Github title="Github: @jonpearse" />
					</a>
				</li>
			</ul>
		</nav>
	</footer>
);
