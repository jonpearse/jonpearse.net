import { PropsWithChildren } from '@kitajs/html';
import { AutoMode, Contrast, DarkMode, IconProps, LightMode, Tick } from './icons';

export const ThemeSwitcher = () => (
	<section class="theme-switcher">
		<h2>Website theme</h2>

		<button type="button" popovertarget="theme-switcher" class="flex gds-focus">
			<Contrast title="Change theme" />
		</button>

		<ul id="theme-switcher" popover>
			<Switch theme="default" icon={AutoMode}>System</Switch>
			<Switch theme="light" icon={LightMode}>Light mode</Switch>
			<Switch theme="dark" icon={DarkMode}>Dark mode</Switch>
		</ul>
	</section>
);

type SwitchProps = PropsWithChildren & {
	theme: string;
	icon: ( props: IconProps ) => string | Promise<string>;
};

export const Switch = ( { theme, icon: IconComponent, children }: SwitchProps ) => (
	<li>
		<a href={`/set-theme/${theme}`} data-theme={theme} class="flex">
			<IconComponent />
			<span>{children}</span>
			<Tick />
		</a>
	</li>
);
