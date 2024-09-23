import { useState } from "react";

import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";

import { IoNotificationsSharp } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { DiReact } from "react-icons/di";
import { IoAddCircle } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";

import { RiLogoutCircleRLine } from "react-icons/ri";

import logoImg from "../../assets/images/react.png";
import logo2 from "../../assets/images/newlogo.jpeg"
import userImg from "../../assets/images/eu.jpg";

export function SideBar() {
	const [sideBar, setSideBar] = useState(false);

	function handleChangeSideBar() {
		setSideBar((prevState) => !prevState);
	}
	return (
		<Container>
			<Content>
				{!sideBar ? (
					<ClosedSideBar>
						<nav>
							<button onClick={handleChangeSideBar}>
								<BsArrowRight />
							</button>

							<img src={logo2} alt="Eu" />

							{/* Links principais do app */}
							<ul>
								<a href="/" title="Home">
									<IoMdHome />
								</a>
								<a href="/nuevoempleado" title="Nuevo Empleado">
									<IoAddCircle />
								</a>
								<a href="/" title="Inicio">
									<DiReact />
								</a>
								<a href="/" title="Home">
									<DiReact />
								</a>
							</ul>
						</nav>
						<div>
							{/* Icones que pode não ser tão principais no app */}
							<ul>
								<a href="/" title="Notificações">
									<IoNotificationsSharp />
								</a>
								<a href="/" title="Configurações">
									<MdSettings />
								</a>
								<a href="/" title="Sair da conta">
									<RiLogoutCircleRLine />
								</a>
							</ul>

							
						</div>
					</ClosedSideBar>
				) : (
					<OpenSideBar>
						<section>
							<nav>
								<span>
									<button onClick={handleChangeSideBar}>
										<BsArrowLeft />
									</button>
								</span>
								<div>
									<img src={logo2} alt="Eu" />
									<h1>Ejemplo </h1>
								</div>

								{/* Icones principais do app */}
								<ul>
									<a href="/" title="Inicio">
										<IoMdHome />
										<p>Inicio</p>
									</a>
									<a href="/nuevoempleado" title="Nuevo Empleado">
										<IoAddCircle />
										<p>Nuevo Empleado</p>
									</a>
									<a href="/" title="Inicio">
										<DiReact />
										<p>Inicio</p>
									</a>
									<a href="/" title="Alguma coisa">
										<DiReact />
										<p>Inicio</p>
									</a>
								</ul>
							</nav>
							<div>
								{/* Icones que pode não ser tão principais no app */}
								<ul>
									<a href="/">
										<IoNotificationsSharp />
										<p>Notificaciones</p>
									</a>
									<a href="/">
										<MdSettings />
										<p>Configuraciones</p>
									</a>
									<a href="/">
										<RiLogoutCircleRLine />
										<p> Sair da conta </p>
									</a>
								</ul>

								<span>
									<img src={userImg} alt="Eu" />
									<p>Tiago Gonçalves de Castro</p>
								</span>
							</div>
						</section>
						<aside onClick={handleChangeSideBar} />
					</OpenSideBar>
				)}
			</Content>
		</Container>
	);
}
