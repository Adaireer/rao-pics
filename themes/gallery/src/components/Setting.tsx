import type { ChangeEvent } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";
import { useThrottle } from "@react-hook/throttle";
import useScrollPosition from "@react-hook/window-scroll";
import { useRecoilState } from "recoil";

import type { SettingType } from "~/states/setting";
import { settingSelector } from "~/states/setting";

let T: ReturnType<typeof setTimeout> | null = null;
const Setting = () => {
  const router = useRouter();
  const [setting, setSetting] = useRecoilState(settingSelector);

  const handleLayoutChange = async (layout: SettingType["layout"]) => {
    setSetting((prev) => ({
      ...prev,
      layout,
    }));
    await router.replace("/" + layout);
  };

  const [btn, setBtn] = useThrottle(false);
  const scrollY = useScrollPosition(60);

  useEffect(() => {
    setBtn(true);

    const clear = () => {
      if (T) {
        clearTimeout(T);
        T = null;
      }
    };

    clear();

    T = setTimeout(() => {
      setBtn(false);
    }, 3000);

    return () => {
      clear();
    };
  }, [scrollY, setBtn]);

  const changeOrderBy = (e: ChangeEvent<HTMLSelectElement>) => {
    setSetting((prev) => ({
      ...prev,
      orderBy: {
        createdTime: e.target.value as SettingType["orderBy"]["createdTime"],
      },
    }));
  };

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className={`drawer-button glass btn-md btn-circle btn fixed transition-all duration-200 ease-in ${
              btn ? "left-3 top-3" : "-left-6 -top-6 opacity-30 "
            }`}
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="min-h-full w-80 bg-base-100 p-4 text-base md:w-96">
            <div className="rounded-md border border-base-content/10 bg-base-200/30 px-4">
              <div className="flex justify-between py-3">
                <span className="flex items-center">
                  <AdjustmentsVerticalIcon className="mr-1 h-4 w-4" />
                  布局方式
                </span>

                <div className="join">
                  <button
                    onClick={() => handleLayoutChange("masonry")}
                    className={`btn-sm join-item btn font-normal ${
                      setting.layout === "masonry" ? "btn-primary" : ""
                    }`}
                  >
                    瀑布流
                  </button>
                  <button
                    onClick={() => handleLayoutChange("responsive")}
                    className={`btn-sm join-item btn font-normal ${
                      setting.layout === "responsive" ? "btn-primary" : ""
                    }`}
                  >
                    自适应
                  </button>
                </div>
              </div>

              <div className="flex justify-between border-t border-base-content/10 py-3">
                <span className="flex items-center">
                  <ArrowsUpDownIcon className="mr-1 h-4 w-4" />
                  排序方式
                </span>

                <select
                  value={setting.orderBy.createdTime}
                  onChange={changeOrderBy}
                  className="select select-sm bg-base-200 font-normal focus:outline-none"
                >
                  <option value={"asc"}>↑ 创建时间升序</option>
                  <option value={"desc"}>↓ 创建时间降序</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
