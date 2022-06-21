import React, { useEffect } from "react";
import slogan from "../assets/slogan.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import Voted from "./Voted";

//!  Firebase
import { auth, signInWithGoogle } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  // const [isVoted, setIsVoted] = useState(false);

  const authenticatedEmails = [
    "jorenlee.luna@lsu.edu.ph",
    "renzmarion.adorna@lsu.edu.ph",
    "ruffamae.aranez@lsu.edu.ph",
    "florabel.banal@lsu.edu.ph",
    "mark.barcelo@lsu.edu.ph",
    "rickazemira.bayubay@lsu.edu.ph",
    "michaelanicole.bicoy@lsu.edu.ph",
    "chrisheart.blanco@lsu.edu.ph",
    "emeterio.bugas@lsu.edu.ph",
    "cj.caroro@lsu.edu.ph",
    "jademark.delapena@lsu.edu.ph",
    "jayson.dinopol@lsu.edu.ph",
    "estevejehiel.docor@lsu.edu.ph",
    "georgewilson.dumalagan@lsu.edu.ph",
    "aivan.eborda@lsu.edu.ph",
    "lordemmanuel.figueras@lsu.edu.ph",
    "alizanicole.gumapac@lsu.edu.ph",
    "edyrryle.ilisan@lsu.edu.ph",
    "charlesjapet.javier@lsu.edu.ph",
    "janmarthone.largo@lsu.edu.ph",
    "laideljay.leonado@lsu.edu.ph",
    "wenamae.mabasa@lsu.edu.ph",
    "joshua.manisan@lsu.edu.ph",
    "christianjohn.morales@lsu.edu.ph",
    "johnpiolo.mutia@lsu.edu.ph",
    "keith.ostia@lsu.edu.ph",
    "kevin.pelimer@lsu.edu.ph",
    "christianraleigh.policher@lsu.edu.ph",
    "harliequinmarc.quipit@lsu.edu.ph",
    "jan.tinio@lsu.edu.ph",
    "jhastine.ucab@lsu.edu.ph",
    "elban.vasaya@lsu.edu.ph",
    "whitkyle.yonting@lsu.edu.ph",
    "vince.apa@lsu.edu.ph",
    "cleearr.canillas@lsu.edu.ph",
    "jessamae.copian@lsu.edu.ph",
    "femarieannerowela.corpuz@lsu.edu.ph",
    "jessa.dabon@lsu.edu.ph",
    "brianharvey.garcia@lsu.edu.ph",
    "kissy.garciano@lsu.edu.ph",
    "khrizellemae.gayda@lsu.edu.ph",
    "frencismay.gona@lsu.edu.ph",
    "jayadrien.guivencan@lsu.edu.ph",
    "angelmae.hisoler@lsu.edu.ph",
    "jasonii.labrada@lsu.edu.ph",
    "neil.laurete@lsu.edu.ph",
    "johnleonard.maglangit@lsu.edu.ph",
    "hainzchristian.meso@lsu.edu.ph",
    "aidaluz.olegario@lsu.edu.ph",
    "aloha.onguda@lsu.edu.ph",
    "jessamae.palanas@lsu.edu.ph",
    "leighjames.presno@lsu.edu.ph",
    "draq.ragpala@lsu.edu.ph",
    "jellamae.reasol@lsu.edu.ph",
    "kylleangelo.regalado@lsu.edu.ph",
    "lucymae.tan@lsu.edu.ph",
    "jimwell.wapille@lsu.edu.ph",
    "fortunato.alcuizar@lsu.edu.ph",
    "bansuela.jimholden@lsu.edu.ph",
    "ricamay.bautista@lsu.edu.ph",
    "georgerommel.bautistajr@lsu.edu.ph",
    "andrealyn.canon@lsu.edu.ph",
    "ma.copat@lsu.edu.ph",
    "joshua.copian@lsu.edu.ph",
    "nelly.delavina@lsu.edu.ph",
    "jane.dula@lsu.edu.ph",
    "shawnica.eborda@lsu.edu.ph",
    "michael.emoria@lsu.edu.ph",
    "anthon.empas@lsu.edu.ph",
    "honeygrace.friolo@lsu.edu.ph",
    "gio.idio@lsu.edu.ph",
    "junrey.lanas@lsu.edu.ph",
    "gale.manapol@lsu.edu.ph",
    "joseph.manasan@lsu.edu.ph",
    "jonric.manisan@lsu.edu.ph",
    "drexell.mingo@lsu.edu.ph",
    "maeamor.ocampos@lsu.edu.ph",
    "rafaelferalix.osorio@lsu.edu.ph",
    "johanna.padilla@lsu.edu.ph",
    "paxtongreg.padilla@lsu.edu.ph",
    "jose.parami@lsu.edu.ph",
    "edric.pulgarinas@lsu.edu.ph",
    "stephen.reconalla@lsu.edu.ph",
    "alvy.sumena@lsu.edu.ph",
    "mariah.vidal@lsu.edu.ph",
    "janet.yabo@lsu.edu.ph",
    "sherardprince.adricula@lsu.edu.ph",
    "kurt.alde@lsu.edu.ph",
    "john.balingit@lsu.edu.ph",
    "roquevan.belida@lsu.edu.ph",
    "cherry.cabanes@lsu.edu.ph",
    "seancarlos.cajes@lsu.edu.ph",
    "sunny.calibog@lsu.edu.ph",
    "haykrissha.cuezon@lsu.edu.ph",
    "lester.dinopol@lsu.edu.ph",
    "paul.limpangog@lsu.edu.ph",
    "dennis.lugas@lsu.edu.ph",
    "rhealou.neri@lsu.edu.ph",
    "merraylen.pacheco@lsu.edu.ph",
    "ronnamaepepito@lsu.edu.ph",
    "dave.pinatacan@lsu.edu.ph",
    "genielito.talaba@lsu.edu.ph",
    "trexcyfe.torrefiel@lsu.edu.ph",
    "warren.villafranca@lsu.edu.ph",
    "niel.villarejo@lsu.edu.ph",
    "rolandojohn.aca-ac@lsu.edu.ph",
    "abbykate.delapena@lsu.edu.ph",
    "joshua.delossantos@lsu.edu.ph",
    "cathylynshaine.olandre@lsu.edu.ph",
    "herbertjr.olavidez@lsu.edu.ph",
    "rheamae.rafol@lsu.edu.ph",
    "patrickzane.sarabia@lsu.edu.ph",
    "harold.tacastacas@lsu.edu.ph",
    "guyalexander.abucay@lsu.edu.ph",
    "karlcristian.almonia@lsu.edu.ph",
    "rueldean.buray@lsu.edu.ph",
    "raev.epong@lsu.edu.ph",
    "olario.andresedman@lsu.edu.ph",
    "samanthanicole.bayaga@lsu.edu.ph",
    "samantha.guadalquiver@lsu.edu.ph",
    "ruben.tagama@lsu.edu.ph",
    "apsie.tese@lsu.edu.ph",
    "markanthony.bonggol@lsu.edu.ph",
    "michael.canino@lsu.edu.ph",
    "bryan.obagan@lsu.edu.ph",
  ];

  //!  Adds user token to localStorage upon signin
  useEffect(() => {
    if (user && localStorage.getItem("token")) {
      const filteredUsers = authenticatedEmails.find(
        (arr) => arr === user.email
      );
      if (filteredUsers) {
        navigate("/welcome");
        console.log(user.email);
      } else {
        navigate("/");
        alert("You are not part of the org!");
      }
      // console.log(user);
    } else {
      navigate("/");
    }
  }, [user, loading, error, navigate]);


  return (
    <div className="flex h-screen">
    <div className="lg:m-auto my-10 mx-5">
      <div className="lg:shadow-2xl lg:box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);">
        <div className="lg:flex">
          <div className="lg:w-80">
            <img
              className="lg:w-80 shadow-box"
              src={slogan}
              alt="slogan logo"
            />
          </div>
          <div className="lg:w-80 lg:relative">
            <div className="lg:absolute lg:top-1/2 left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:pt-0 pt-10">
              <StyledButton
                onClick={signInWithGoogle}
                className="mx-auto block"
              >
                <img
                  className="lg:h-10 h-14 lg:shadow-box"
                  src="/btn_google_signin_dark_pressed_web@2x.png"
                  alt="signin"
                />
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;

const StyledButton = styled.button`
  transition: 0.15s;
  cursor: pointer;
`;
